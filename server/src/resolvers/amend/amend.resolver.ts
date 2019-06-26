import { Amend } from '../../entities'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { AmendService, AuthService } from '../../services'
import { Response, IdInput, withAuthentication, pubSub } from '../../common'
import { Topic } from '../../common/topics'
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
  constructor(
    private readonly amendService: AmendService,
    private readonly authService: AuthService
  ) {}

  @Query(returns => AmendResponse)
  async amend(@Args('id') id: string): Promise<IResponse<Amend>> {
    return await this.amendService.getAmend(id)
  }

  @Mutation(returns => AmendResponse)
  @withAuthentication
  async postAmend(
    @Args('data') data: PostAmendInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.postAmend(data)
  }

  @Mutation(returns => AmendResponse)
  @withAuthentication
  async upVoteAmend(@Args('data') data: IdInput): Promise<IResponse<Amend>> {
    return await this.amendService.upVoteAmend(data)
  }

  @Mutation(returns => AmendResponse)
  @withAuthentication
  async upDownAmend(@Args('data') data: IdInput): Promise<IResponse<Amend>> {
    return await this.amendService.downVoteAmend(data)
  }

  @Mutation(returns => AmendResponse)
  @withAuthentication
  async unVoteAmend(@Args('data') data: IdInput): Promise<IResponse<Amend>> {
    return await this.amendService.unVoteAmend(data)
  }

  @Mutation(returns => AmendResponse)
  @withAuthentication
  async postArgument(
    @Args('data') newArgument: PostArgumentInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.postArgument(newArgument)
  }

  @Mutation(returns => AmendResponse)
  @withAuthentication
  async upVoteArgument(
    @Args('data') data: VoteArgumentInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.upVoteArgument(data)
  }

  @Mutation(returns => AmendResponse)
  @withAuthentication
  async upDownArgument(
    @Args('data') data: VoteArgumentInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.downVoteArgument(data)
  }

  @Mutation(returns => AmendResponse)
  @withAuthentication
  async unVoteArgument(
    @Args('data') data: VoteArgumentInputs
  ): Promise<IResponse<Amend>> {
    return await this.amendService.unVoteArgument(data)
  }

  @Subscription(returns => AmendResponse, { resolve: payload => payload })
  newAmend() {
    return pubSub.asyncIterator(Topic.NewAmend)
  }

  @Subscription(returns => AmendResponse, { resolve: payload => payload })
  updateAmend() {
    return pubSub.asyncIterator(Topic.UpdateAmend)
  }
}
