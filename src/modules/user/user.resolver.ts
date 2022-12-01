import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgType, SchemaObjectId } from 'common/models';
import { CreateUserInput } from './dto/create-user.input';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  public createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserEntity], { name: 'users' })
  public findAll(@Args() filterOptions: PaginationArgType) {
    return this.userService.findAll(filterOptions);
  }

  @Query(() => UserEntity, { name: 'user' })
  public findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOneById(id);
  }

  @Mutation(() => UserEntity)
  public removeUser(@Args('id', { type: () => String }) id: SchemaObjectId) {
    return this.userService.remove(id);
  }
}
