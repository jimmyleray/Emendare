import { Amend } from '../entities'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AmendService } from '../services'
import { PostAmendInputs } from './inputs'
import { Response } from '../types'
import { IResponse } from '../../../interfaces'
import { ObjectType } from 'type-graphql'

@ObjectType()
class AmendResponse extends Response(Amend) {}

@Resolver()
export class AmendResolver {
  constructor(private readonly amendService: AmendService) {}

  @Query(returns => AmendResponse)
  async amend(@Args('id') id: string): Promise<IResponse<Amend>> {
    return await this.amendService.getAmend(id)
  }

  @Mutation(returns => AmendResponse)
  async postAmend(
    @Args('data') data: PostAmendInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.postAmend(data)
  }
}
