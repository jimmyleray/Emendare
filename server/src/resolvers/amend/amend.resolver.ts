import { Amend } from '../../entities'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AmendService } from '../../services'
import { IdArg, Response, IdInput } from '../../common'
import { IResponse } from '../../../../interfaces'
import { ObjectType } from 'type-graphql'
import {
  PostAmendInputs,
  PostArgumentInputs,
  VoteArgumentInputs
} from './inputs'

@ObjectType()
class AmendResponse extends Response(Amend) {}

@Resolver()
export class AmendResolver {
  constructor(private readonly amendService: AmendService) {}

  @Query(returns => AmendResponse)
  async amend(@Args() { id }: IdArg): Promise<IResponse<Amend>> {
    return await this.amendService.getAmend(id)
  }

  @Mutation(returns => AmendResponse)
  async postAmend(
    @Args('data') data: PostAmendInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.postAmend(data)
  }

  @Mutation(returns => AmendResponse)
  async upVoteAmend(@Args('data') data: IdInput): Promise<IResponse<Amend>> {
    return await this.amendService.upVoteAmend(data)
  }

  @Mutation(returns => AmendResponse)
  async upDownAmend(@Args('data') data: IdInput): Promise<IResponse<Amend>> {
    return await this.amendService.downVoteAmend(data)
  }

  @Mutation(returns => AmendResponse)
  async unVoteAmend(@Args('data') data: IdInput): Promise<IResponse<Amend>> {
    return await this.amendService.unVoteAmend(data)
  }

  @Mutation(returns => AmendResponse)
  async postArgument(
    @Args('data') newArgument: PostArgumentInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.postArgument(newArgument)
  }

  @Mutation(returns => AmendResponse)
  async upVoteArgument(
    @Args('data') data: VoteArgumentInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.upVoteArgument(data)
  }

  @Mutation(returns => AmendResponse)
  async upDownArgument(
    @Args('data') data: VoteArgumentInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.downVoteArgument(data)
  }

  @Mutation(returns => AmendResponse)
  async unVoteArgument(
    @Args('data') data: VoteArgumentInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.unVoteArgument(data)
  }
}
