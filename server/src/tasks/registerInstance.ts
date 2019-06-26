import fetch from 'node-fetch'
import config from '../config'
import chalk from 'chalk'

export const registerInstance = async () => {
  if (config.instance.instanceUrl) {
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

    console.log(chalk.cyan('Call for register instance done\n'))
  } else {
    console.log(
      chalk.redBright('Need to set INSTANCE_URL environment variable !\n')
    )
  }
}
