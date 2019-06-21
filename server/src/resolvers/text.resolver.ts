import { Text } from '../entities'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TextService } from '../services'
import { PostTextInputs } from './inputs'
import { Response } from '../types'
import { IResponse } from '../../../interfaces'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class TextResponse extends Response(Text) {}

@Resolver()
export class TextResolver {
  constructor(private readonly textService: TextService) {}

  @Query(returns => TextResponse)
  async text(@Args('id') id: string): Promise<IResponse<Text>> {
    return await this.textService.getText(id)
  }

  @Query(returns => [String])
  async texts(): Promise<IResponse<string[]>> {
    return await this.textService.getTexts()
  }

  @Mutation(returns => TextResponse)
  async postText(@Args('data') data: PostTextInputs): Promise<IResponse<Text>> {
    return this.textService.postText(data)
  }

  @Mutation(returns => TextResponse)
  async unFollowText(@Args('id') id: string): Promise<IResponse<Text>> {
    return this.textService.unFollowText(id)
  }

  @Mutation(returns => TextResponse)
  async followText(@Args('id') id: string): Promise<IResponse<Text>> {
    return this.textService.followText(id)
  }
}
