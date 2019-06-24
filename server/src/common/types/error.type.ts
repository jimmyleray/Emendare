import { IError } from '../../../../interfaces'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Error implements IError {
  @Field()
  message: string
  @Field()
  code: number
}
