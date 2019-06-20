import { Entity, Column, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: process.env.NODE_ENV !== 'production' })
  activated: boolean

  @Column({ default: new Date(Date.now()) })
  created: Date

  @Column({ default: new Date(Date.now()) })
  lastEventDate: Date

  @Column({ default: null })
  activationToken: string

  @Column({ default: [] })
  followedTexts: string[]

  @Column({ default: [] })
  upVotes: string[]

  @Column({ default: [] })
  indVotes: string[]

  @Column({ default: [] })
  downVotes: string[]

  @Column({
    default: {
      newText: true,
      newAmend: true,
      amendAccepted: true,
      amendRefused: true
    }
  })
  notifications: {
    newText: boolean
    newAmend: boolean
    amendAccepted: boolean
    amendRefused: boolean
  }

  @Column({ default: [] })
  argumentUpVotes: Array<{ amendID: string; argumentID: string }>

  @Column({ default: [] })
  argumentDownVotes: Array<{ amendID: string; argumentID: string }>

  constructor(email: string, password: string, activationToken: string) {
    super()
    this.email = email
    this.password = password
    this.activationToken = activationToken
    this.activated = process.env.NODE_ENV !== 'production'
    this.created = new Date(Date.now())
    this.lastEventDate = new Date(Date.now())
    this.followedTexts = []
    this.notifications = {
      newText: true,
      newAmend: true,
      amendAccepted: true,
      amendRefused: true
    }
    this.indVotes = []
    this.upVotes = []
    this.downVotes = []
    this.argumentDownVotes = []
    this.argumentUpVotes = []
  }
}
