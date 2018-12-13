import config from '../config/api'
import { environment } from './env'

export const api = pathname => config.url[environment] + pathname
