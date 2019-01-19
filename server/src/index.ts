// TS Interfaces import
import { IContribution, IContributors } from './interfaces'

// Global configuration
import config from './config'

// Fetch API polyfills
import fetch from 'node-fetch'

// Express Html Application
import express from 'express'
const app = express()

// Lib to hash passwords
import bcrypt from 'bcrypt'

// Matcher utility
// https://github.com/jonschlinkert/is-match
import isMatch from 'is-match'
const isMatchZenika = isMatch('*@zenika.com')

// Diff Patch Library
import * as JsDiff from 'diff'

// MongoDB connection
import Database from './mongo'
new Database().connect()

// MongoDB models
import { Amend, Event, Group, Text, User } from './models'

// Services imports
import { Crypto, Mailer } from './services'
const Mail = process.env.NODE_ENV === 'production' ? new Mailer() : null

// Public API for get texts by ID
app.get('/text/:id', async (req, res) => {
  const text = await Text.model.findById(req.params.id)
  if (text) {
    res.end(text.actual)
  } else {
    res.status(404).end()
  }
})

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).end()
})

// Add Socket.io to Express server
import { Server } from 'http'
const http = new Server(app)

import socketIO from 'socket.io'
const io = socketIO(http, {
  cookie: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  serveClient: false
})

const delay = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const hasAbsoluteUpMajority = (amend: any) =>
  amend.upVotesCount > amend.indVotesCount &&
  amend.upVotesCount + amend.indVotesCount >=
    Math.floor(amend.text.followersCount / 2) + 1

const hasAbsoluteDownMajority = (amend: any) =>
  amend.downVotesCount > amend.indVotesCount &&
  amend.downVotesCount + amend.indVotesCount >=
    Math.floor(amend.text.followersCount / 2) + 1

const hasAbsoluteMajority = (amend: any) =>
  hasAbsoluteUpMajority(amend) || hasAbsoluteDownMajority(amend)

const hasRelativeUpMajority = (amend: any) =>
  amend.upVotesCount > amend.downVotesCount

const updateTextWithAmend = async (amend: any) => {
  amend.accepted = true
  const newText = JsDiff.applyPatch(amend.text.actual, amend.patch)
  console.log(newText)

  if (newText) {
    amend.version = amend.text.patches.length
    amend.text.patches.push(amend.patch)
    amend.text.actual = newText
  } else {
    amend.conflicted = true
  }

  await amend.text.save()

  const text = await Text.model
    .findById(amend.text._id)
    .populate('amends')
    .populate('group')

  io.emit('text/' + text._id, { data: text })
}

const checkAmendVotes = async () => {
  // On récupère tous les scrutins en cours
  const amends = await Amend.model.find({ closed: false }).populate('text')

  const date = new Date()
  const now = date.getTime()

  amends.forEach(async (amend: any) => {
    const start = amend.created.getTime()

    // Si le scrutin est terminé
    if (now > start + amend.delayMax) {
      amend.closed = true
      amend.finished = new Date()
      amend.totalPotentialVotesCount = amend.text.followersCount

      // Si il y'a une majorité relative
      if (hasRelativeUpMajority(amend)) {
        updateTextWithAmend(amend)
      }

      await amend.save()
      io.emit('amend/' + amend._id, { data: amend })
    } else if (now > start + amend.delayMin && hasAbsoluteMajority(amend)) {
      amend.closed = true
      amend.finished = new Date()
      amend.totalPotentialVotesCount = amend.text.followersCount

      // Si il y'a une majorité absolue
      if (hasAbsoluteUpMajority(amend)) {
        updateTextWithAmend(amend)
      }

      await amend.save()
      io.emit('amend/' + amend._id, { data: amend })
    }
  })

  await delay(10 * 1000)
  checkAmendVotes()
}

checkAmendVotes()

io.on('connection', socket => {
  socket.on('customPing', ({ data }) => {
    socket.emit('customPong', data)
  })

  socket.on('activation', async ({ activationToken }) => {
    const user = await User.model.findOne({ activationToken })
    if (user && !user.activated) {
      user.activated = true
      await user.save()
      socket.emit('activation', { data: user })
    } else {
      socket.emit('activation', {
        error: { code: 405, message: 'Ce compte est déjà activé' }
      })
    }
  })

  socket.on('login', async ({ token, data }) => {
    const { email, password } = data
    if (email && password) {
      const user = await User.model
        .findOne({ email })
        .populate('amends')
        .populate({ path: 'followedTexts', populate: { path: 'amends' } })
        .populate('followedGroups')
      if (user && user.activated) {
        bcrypt.compare(password, user.password, async (err, valid) => {
          if (valid) {
            const newToken = Crypto.getToken()
            user.token = newToken
            await user.save()
            socket.emit('login', { data: user })
          } else {
            socket.emit('login', {
              error: { code: 401, message: 'Le mot de passe est invalide' }
            })
          }
        })
      } else {
        socket.emit('login', {
          error: { code: 405, message: "L'email est invalide" }
        })
      }
    } else if (token) {
      const user = await User.model
        .findOne({ token })
        .populate('amends')
        .populate({ path: 'followedTexts', populate: { path: 'amends' } })
        .populate('followedGroups')
      if (user) {
        socket.emit('login', { data: user })
      } else {
        socket.emit('login', {
          error: { code: 405, message: 'Le token est invalide' }
        })
      }
    } else {
      socket.emit('login', {
        error: { code: 405, message: 'La requete est invalide' }
      })
    }
  })

  socket.on('subscribe', async ({ data }) => {
    const { email, password } = data
    if (!email || !isMatchZenika(email)) {
      socket.emit('subscribe', {
        error: {
          code: 405,
          message:
            'Pendant cette phase de test, seules les adresses électroniques se terminant par @zenika.com sont acceptées.'
        }
      })
    } else {
      if (await User.model.findOne({ email })) {
        socket.emit('subscribe', {
          error: {
            code: 405,
            message:
              "Cet email est déjà utilisé. Si il s'agit de votre compte, essayez de vous y connecter directement."
          }
        })
      } else {
        if (!password) {
          socket.emit('subscribe', {
            error: { code: 405, message: 'Le mot de passe est requis' }
          })
        } else {
          bcrypt.hash(password, 10, async (err, hash) => {
            const activationToken = Crypto.getToken()
            await new User.model({
              email,
              password: hash,
              activationToken
            }).save()
            Mail.send({
              to: email,
              subject: 'Activation de votre compte Emendare',
              html: `<p>Cliquez sur le lien suivant pour activer votre compte :</p>
              <a href="https://emendare.org/activation/${activationToken}">Activer mon compte Emendare</a>`
            })
            socket.emit('subscribe')
          })
        }
      }
    }
  })

  socket.on('logout', async ({ token }) => {
    const user = await User.model.findOne({ token })
    if (user) {
      user.token = null
      await user.save()
    }
    socket.emit('logout')
  })

  socket.on('user', async ({ token }) => {
    if (token) {
      const user = await User.model
        .findOne({ token })
        .populate('amends')
        .populate({ path: 'followedTexts', populate: { path: 'amends' } })
        .populate('followedGroups')
      if (user) {
        socket.emit('user', { data: user })
      } else {
        socket.emit('user', {
          error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
        })
      }
    } else {
      socket.emit('user', {
        error: { code: 405, message: 'Le token est invalide' }
      })
    }
  })

  socket.on('events', async () => {
    const events = await Event.model.find().sort('-created')
    socket.emit('events', { data: events })
  })

  socket.on('rootGroup', async () => {
    const rootGroup = await Group.model
      .findOne({ parent: null })
      .populate('subgroups')
      .populate('texts')
      .populate('parent')
      .populate('rules')

    if (rootGroup) {
      socket.emit('rootGroup', { data: rootGroup })
    } else {
      socket.emit('rootGroup', {
        error: { code: 404, message: "Oups, ce groupe n'existe pas ou plus" }
      })
    }
  })

  socket.on('group', async ({ data }) => {
    const group = await Group.model
      .findById(data.id)
      .populate('subgroups')
      .populate('texts')
      .populate('parent')
      .populate('rules')

    if (group) {
      socket.emit('group', { data: group })
    } else {
      socket.emit('group', {
        error: { code: 404, message: "Oups, ce groupe n'existe pas ou plus" }
      })
    }
  })

  socket.on('text', async ({ data }) => {
    const text = await Text.model
      .findById(data.id)
      .populate('amends')
      .populate('group')

    if (text) {
      socket.emit('text', { data: text })
    } else {
      socket.emit('text', {
        error: { code: 404, message: "Oups, ce texte n'existe pas ou plus" }
      })
    }
  })

  socket.on('amend', async ({ data }) => {
    const amend = await Amend.model.findById(data.id).populate('text')

    if (amend) {
      socket.emit('amend', { data: amend })
    } else {
      socket.emit('amend', {
        error: {
          code: 404,
          message: "Oups, cet amendement n'existe pas ou plus"
        }
      })
    }
  })

  socket.on('postAmend', async ({ token, data }) => {
    const { name, description, patch, version, textID } = data
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await new Amend.model({
        description,
        name,
        patch,
        text: textID,
        version
      }).save()

      user.amends.push(amend._id)
      await user.save()

      let text = await Text.model.findById(textID)
      text.amends.push(amend._id)
      await text.save()

      text = await Text.model
        .findById(textID)
        .populate('amends')
        .populate('group')

      await new Event.model({
        target: JSON.stringify({ ...amend._doc, text }),
        targetType: 'amend'
      }).save()

      const events = await Event.model.find().sort('-created')
      io.emit('events', { data: events })
      io.emit('text/' + text._id, { data: text })
      socket.emit('postAmend', { data: amend })
    } else {
      socket.emit('postAmend', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  })

  socket.on('joinGroup', async ({ token, data }) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      if (user.followedGroups.indexOf(data.id) === -1) {
        user.followedGroups.push(data.id)
        await user.save()

        const group = await Group.model
          .findById(data.id)
          .populate('subgroups')
          .populate('texts')
          .populate('parent')
          .populate('rules')
        group.followersCount++
        await group.save()

        io.emit('group/' + group._id, { data: group })
        socket.emit('joinGroup')
      } else {
        socket.emit('joinGroup', {
          error: { code: 405, message: 'Vous participez déjà ce groupe' }
        })
      }
    } else {
      socket.emit('joinGroup', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  })

  socket.on('quitGroup', async ({ token, data }) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const id = user.followedGroups.indexOf(data.id)
      if (id >= 0) {
        user.followedGroups.splice(id, 1)
        await user.save()

        const group = await Group.model
          .findById(data.id)
          .populate('subgroups')
          .populate('texts')
          .populate('parent')
          .populate('rules')
        group.followersCount--
        await group.save()

        io.emit('group/' + group._id, { data: group })
        socket.emit('quitGroup')
      } else {
        socket.emit('quitGroup', {
          error: { code: 405, message: "Ce groupe n'est pas suivi" }
        })
      }
    } else {
      socket.emit('quitGroup', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  })

  socket.on('followText', async ({ token, data }) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      if (user.followedTexts.indexOf(data.id) === -1) {
        user.followedTexts.push(data.id)
        await user.save()

        const text = await Text.model
          .findById(data.id)
          .populate('amends')
          .populate('group')
        text.followersCount++
        await text.save()

        io.emit('text/' + text._id, { data: text })
        socket.emit('followText')
      } else {
        socket.emit('followText', {
          error: { code: 405, message: 'Vous participez déjà à ce texte' }
        })
      }
    } else {
      socket.emit('followText', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  })

  socket.on('unFollowText', async ({ token, data }) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const id = user.followedTexts.indexOf(data.id)
      if (id >= 0) {
        user.followedTexts.splice(id, 1)
        await user.save()

        const text = await Text.model
          .findById(data.id)
          .populate('amends')
          .populate('group')
        text.followersCount--
        await text.save()

        io.emit('text/' + text._id, { data: text })
        socket.emit('unFollowText')
      } else {
        socket.emit('unFollowText', {
          error: { code: 405, message: "Ce texte n'est pas suivi" }
        })
      }
    } else {
      socket.emit('unFollowText', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  })

  socket.on('upVoteAmend', async ({ token, data }) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await Amend.model.findById(data.id).populate('text')
      if (user.followedTexts.indexOf(amend.text._id) > -1) {
        if (!amend.closed) {
          if (user.upVotes.indexOf(data.id) === -1) {
            const id1 = user.downVotes.indexOf(data.id)
            if (id1 > -1) {
              amend.downVotesCount--
              user.downVotes.splice(id1, 1)
            }

            const id2 = user.indVotes.indexOf(data.id)
            if (id2 > -1) {
              amend.indVotesCount--
              user.indVotes.splice(id2, 1)
            }

            amend.upVotesCount++
            user.upVotes.push(data.id)

            await user.save()
            await amend.save()

            io.emit('amend/' + amend._id, { data: amend })
            socket.emit('upVoteAmend', { data: amend })
          } else {
            socket.emit('upVoteAmend', {
              error: { code: 405, message: 'Vous avez déjà voté pour' }
            })
          }
        } else {
          socket.emit('upVoteAmend', {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          })
        }
      } else {
        socket.emit('upVoteAmend', {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas au texte'
          }
        })
      }
    } else {
      socket.emit('upVoteAmend', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  })

  socket.on('downVoteAmend', async ({ token, data }) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await Amend.model.findById(data.id).populate('text')
      if (user.followedTexts.indexOf(amend.text._id) > -1) {
        if (!amend.closed) {
          if (user.downVotes.indexOf(data.id) === -1) {
            const id1 = user.upVotes.indexOf(data.id)
            if (id1 > -1) {
              amend.upVotesCount--
              user.upVotes.splice(id1, 1)
            }

            const id2 = user.indVotes.indexOf(data.id)
            if (id2 > -1) {
              amend.indVotesCount--
              user.indVotes.splice(id2, 1)
            }

            amend.downVotesCount++
            user.downVotes.push(data.id)

            await user.save()
            await amend.save()

            io.emit('amend/' + amend._id, { data: amend })
            socket.emit('downVoteAmend', { data: amend })
          } else {
            socket.emit('downVoteAmend', {
              error: { code: 405, message: 'Vous avez déjà voté contre' }
            })
          }
        } else {
          socket.emit('downVoteAmend', {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          })
        }
      } else {
        socket.emit('downVoteAmend', {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas au texte'
          }
        })
      }
    } else {
      socket.emit('downVoteAmend', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  })

  socket.on('indVoteAmend', async ({ token, data }) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await Amend.model.findById(data.id).populate('text')
      if (user.followedTexts.indexOf(amend.text._id) > -1) {
        if (!amend.closed) {
          if (user.indVotes.indexOf(data.id) === -1) {
            const id1 = user.upVotes.indexOf(data.id)
            if (id1 > -1) {
              amend.upVotesCount--
              user.upVotes.splice(id1, 1)
            }

            const id2 = user.downVotes.indexOf(data.id)
            if (id2 > -1) {
              amend.downVotesCount--
              user.downVotes.splice(id2, 1)
            }

            amend.indVotesCount++
            user.indVotes.push(data.id)

            await user.save()
            await amend.save()

            io.emit('amend/' + amend._id, { data: amend })
            socket.emit('indVoteAmend', { data: amend })
          } else {
            socket.emit('indVoteAmend', {
              error: { code: 405, message: 'Vous avez déjà voté indifférent' }
            })
          }
        } else {
          socket.emit('indVoteAmend', {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          })
        }
      } else {
        socket.emit('indVoteAmend', {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas au texte'
          }
        })
      }
    } else {
      socket.emit('indVoteAmend', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  })

  socket.on('unVoteAmend', async ({ token, data }) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await Amend.model.findById(data.id).populate('text')
      if (user.followedTexts.indexOf(amend.text._id) > -1) {
        if (!amend.closed) {
          const id1 = user.upVotes.indexOf(data.id)
          const id2 = user.downVotes.indexOf(data.id)
          const id3 = user.indVotes.indexOf(data.id)

          if (id1 > -1) {
            amend.upVotesCount--
            user.upVotes.splice(id1, 1)
          }

          if (id2 > -1) {
            amend.downVotesCount--
            user.downVotes.splice(id2, 1)
          }

          if (id3 > -1) {
            amend.indVotesCount--
            user.indVotes.splice(id3, 1)
          }

          await user.save()
          await amend.save()

          io.emit('amend/' + amend._id, { data: amend })
          socket.emit('unVoteAmend', { data: amend })
        } else {
          socket.emit('unVoteAmend', {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          })
        }
      } else {
        socket.emit('unVoteAmend', {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas à ce texte'
          }
        })
      }
    } else {
      socket.emit('unVoteAmend', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  })

  socket.on('contributors', async () => {
    const res = await fetch(config.contributions)
    const contributions: IContribution[] = await res.json()
    const data = contributions.reduce<IContributors>((acc, commit) => {
      if (acc[commit.author_email]) {
        acc[commit.author_email].count++
      } else {
        acc[commit.author_email] = {
          count: 1,
          name: commit.author_name
        }
      }
      return acc
    }, {})

    socket.emit('contributors', { data })
  })
})

// Start Http Server
http.listen(config.port, () => {
  console.log(`Server start and listening on port ${config.port}`)
})
