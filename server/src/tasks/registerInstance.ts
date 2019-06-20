import fetch from 'node-fetch'
import config from '../config'

// Chalk for colored logs
import chalk from 'chalk'

export const registerInstance = async () => {
  await fetch(config.registerUrl + 'registerInstance', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instanceUrl: config.instance.instanceUrl
    })
  })

  console.log(chalk.green('Call for register instance done\n'))
}
