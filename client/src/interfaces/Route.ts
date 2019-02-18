import { ComponentClass } from 'react'

export interface IRoute {
  name: string
  path: string | ((id?: string) => string)
  exact?: boolean
  private?: boolean
  component?: ComponentClass<any, any>
}
