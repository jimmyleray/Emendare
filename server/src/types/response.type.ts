import { ClassType, ObjectType, Field } from 'type-graphql'
import { Error } from '../types'
import { IResponse } from '../../../interfaces'

export function Response<TItem>(TItemClass: ClassType<TItem>): any {
  @ObjectType({ isAbstract: true })
  abstract class ResponseClass implements IResponse<TItem> {
    @Field(type => TItemClass, { nullable: true })
    data: TItem | null
    @Field(type => Error, { nullable: true })
    error: Error
  }

  return ResponseClass
}
