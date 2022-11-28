import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChapService } from './chap.service';
import { Chap } from './entities/chap.entity';
import { CreateChapInput } from './dto/create-chap.input';
import { UpdateChapInput } from './dto/update-chap.input';

@Resolver(() => Chap)
export class ChapResolver {
  constructor(private readonly chapService: ChapService) {}

  @Mutation(() => Chap)
  createChap(@Args('createChapInput') createChapInput: CreateChapInput) {
    return this.chapService.create(createChapInput);
  }

  @Query(() => [Chap], { name: 'chap' })
  findAll() {
    return this.chapService.findAll();
  }

  @Query(() => Chap, { name: 'chap' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chapService.findOne(id);
  }

  @Mutation(() => Chap)
  updateChap(@Args('updateChapInput') updateChapInput: UpdateChapInput) {
    return this.chapService.update(updateChapInput.id, updateChapInput);
  }

  @Mutation(() => Chap)
  removeChap(@Args('id', { type: () => Int }) id: number) {
    return this.chapService.remove(id);
  }
}
