import { Text } from '../../entities'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TextService, AuthService } from '../../services'
import { PostTextInputs } from './inputs'
import {
  Response,
  IdInput,
  withAuthentication,
  pubSubEvent
} from '../../common'
import { Topic } from '../../common/topics'
import { IResponse } from '../../../../interfaces'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class TextResponse extends Response(Text) {}

@ObjectType()
class TextsResponse extends Response(Text) {
  @Field(type => [String], { nullable: true })
  data: string[] | null
}

@Resolver()
export class TextResolver {
  constructor(
    private readonly textService: TextService,
    private readonly authService: AuthService
  ) {}

  @Query(returns => TextResponse)
  async text(@Args('id') id: string): Promise<IResponse<Text>> {
    return await this.textService.getText(id)
  }

  @Query(returns => TextsResponse)
  async texts(): Promise<IResponse<string[]>> {
    return await this.textService.getTexts()
  }

  @Mutation(returns => TextResponse)
  @withAuthentication
  async postText(@Args('data') data: PostTextInputs): Promise<IResponse<Text>> {
    return await this.textService.postText(data)
  }

  @Mutation(returns => TextResponse)
  @withAuthentication
  async unFollowText(@Args('data') data: IdInput): Promise<IResponse<Text>> {
    return this.textService.unFollowText(data)
  }

  @Mutation(returns => TextResponse)
  @withAuthentication
  async followText(@Args('data') data: IdInput): Promise<IResponse<Text>> {
    return this.textService.followText(data)
  }
}
