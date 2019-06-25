import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ObjectType } from 'type-graphql'
import { User } from 'src/entities'
import { Response, withAuthentication, TokenArgs } from '../../common'
import { UserService, AuthService } from 'src/services'
import { IResponse } from '../../../../interfaces'
import {
  UserInputs,
  EmailInput,
  EmailArgs,
  UserArgs,
  PasswordInput,
  NotificationInput
} from './inputs'

@ObjectType()
class UserResponse extends Response(User) {}

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Query(returns => UserResponse)
  @withAuthentication
  async user(@Args() { token }: TokenArgs): Promise<IResponse<User>> {
    const { id } = this.authService.decodeToken(token)
    const user = await this.userService.getUser(id)
    return { data: user }
  }

  @Mutation(returns => UserResponse)
  async activateUser(@Args('token') token: string): Promise<IResponse<User>> {
    return await this.userService.activateUser(token)
  }

  @Mutation(returns => UserResponse)
  async subsribeUser(@Args('data') data: UserInputs): Promise<IResponse<User>> {
    return await this.userService.subscribe(data)
  }

  @Mutation(returns => UserResponse)
  async loginUser(@Args() data: UserArgs): Promise<IResponse<User>> {
    return await this.userService.login(data)
  }

  @Mutation(returns => UserResponse)
  @withAuthentication
  async resetPassword(@Args() data: EmailArgs): Promise<IResponse<User>> {
    return await this.userService.resetPassword(data)
  }

  @Mutation(returns => UserResponse)
  @withAuthentication
  async updateEmail(@Args('data') data: EmailInput): Promise<IResponse<User>> {
    return await this.userService.updateEmail(data)
  }

  @Mutation(returns => UserResponse)
  @withAuthentication
  async deleteAccount(@Args() data: TokenArgs): Promise<IResponse<User>> {
    return await this.userService.delete(data)
  }

  @Mutation(returns => UserResponse)
  @withAuthentication
  async updatePassword(
    @Args('data') data: PasswordInput
  ): Promise<IResponse<User>> {
    return await this.userService.updatePassword(data)
  }

  @Mutation(returns => UserResponse)
  @withAuthentication
  async updateLastEvent(@Args() data: TokenArgs): Promise<IResponse<User>> {
    return await this.userService.updateLastEventDate(data)
  }

  @Mutation(returns => UserResponse)
  @withAuthentication
  async toggleNotificationSetting(
    @Args('data') data: NotificationInput
  ): Promise<IResponse<User>> {
    return await this.userService.toggleNotificationSetting(data)
  }
}
