import { Text } from '../../entities'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TextService } from '../../services'
import { PostTextInputs } from './inputs'
import { Response, IdArg, IdInput } from '../../common'
import { IResponse } from '../../../../interfaces'
import { ObjectType } from 'type-graphql'

@ObjectType()
class TextResponse extends Response(Text) {}

@Resolver()
export class TextResolver {
  constructor(private readonly textService: TextService) {}

  @Query(returns => TextResponse)
  async text(@Args() { id }: IdArg): Promise<IResponse<Text>> {
    return await this.textService.getText(id)
  }

  @Mutation(returns => TextResponse)
  async postText(@Args('data') data: PostTextInputs): Promise<IResponse<Text>> {
    return this.textService.postText(data)
  }

  @Mutation(returns => TextResponse)
  async unFollowText(@Args() data: IdInput): Promise<IResponse<Text>> {
    return this.textService.unFollowText(data)
  }

  @Mutation(returns => TextResponse)
  async followText(@Args('data') data: IdInput): Promise<IResponse<Text>> {
    return this.textService.followText(data)
  }
}
