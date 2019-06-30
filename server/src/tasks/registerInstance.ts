import fetch from 'node-fetch'
import config from '../config'
import chalk from 'chalk'

export const registerInstance = async () => {
  try {
    if (config.instance.instanceUrl) {
      console.log(chalk.cyan('Call for register'))

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

      console.log(chalk.cyan('Instance registered'))
    } else {
      throw new Error('Need to set INSTANCE_URL environment variable')
    }
  } catch (error) {
    console.log(chalk.redBright('Error in instance registration'))
    console.log(chalk.redBright(error))
  }
}
