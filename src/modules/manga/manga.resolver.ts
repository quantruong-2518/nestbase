import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema } from 'mongoose';

import { CreateMangaInput, UpdateMangaInput } from './dto';
import { MangaEntity } from './entities';
import { MangaService } from './manga.service';
import { GqlAuthGuard } from 'modules/auth/guards';
import { PaginationArgType } from 'common/models';

@Resolver(() => MangaEntity)
@UseGuards(GqlAuthGuard)
export class MangaResolver {
  constructor(private readonly mangaService: MangaService) {}

  @Mutation(() => MangaEntity)
  public async createManga(
    @Args('createMangaInput') createMangaInput: CreateMangaInput,
  ) {
    return this.mangaService.create(createMangaInput);
  }

  @Query(() => [MangaEntity], { name: 'mangas' })
  public async findAll(@Args() filterOptions: PaginationArgType) {
    return this.mangaService.findAll(filterOptions);
  }

  @Query(() => MangaEntity, { name: 'manga' })
  public async findOne(
    @Args('id', { type: () => Int }) id: Schema.Types.ObjectId,
  ) {
    return this.mangaService.findOne(id);
  }

  @Mutation(() => MangaEntity)
  public async updateManga(
    @Args('updateMangaInput') updateMangaInput: UpdateMangaInput,
  ) {
    return this.mangaService.update(updateMangaInput.id, updateMangaInput);
  }

  @Mutation(() => MangaEntity)
  public async removeManga(
    @Args('id', { type: () => ID }) id: Schema.Types.ObjectId,
  ) {
    return this.mangaService.remove(id);
  }
}
