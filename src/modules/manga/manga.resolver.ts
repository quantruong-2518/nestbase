import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema } from 'mongoose';

import { PaginationArgType } from 'common/pagin/pagin.args';
import { GqlAuthGuard } from 'modules/auth/guards';
import { CreateMangaInput, UpdateMangaInput } from './dto';
import { Manga } from './entities/manga.entity';
import { MangaService } from './manga.service';

@Resolver(() => Manga)
@UseGuards(GqlAuthGuard)
export class MangaResolver {
  constructor(private readonly mangaService: MangaService) {}

  @Mutation(() => Manga)
  public async createManga(
    @Args('createMangaInput') createMangaInput: CreateMangaInput,
  ) {
    return this.mangaService.create(createMangaInput);
  }

  @Query(() => [Manga], { name: 'mangas' })
  public async findAll(@Args() filterOptions: PaginationArgType) {
    return this.mangaService.findAll(filterOptions);
  }

  @Query(() => Manga, { name: 'manga' })
  public async findOne(
    @Args('id', { type: () => Int }) id: Schema.Types.ObjectId,
  ) {
    return this.mangaService.findOne(id);
  }

  @Mutation(() => Manga)
  public async updateManga(
    @Args('updateMangaInput') updateMangaInput: UpdateMangaInput,
  ) {
    return this.mangaService.update(updateMangaInput.id, updateMangaInput);
  }

  @Mutation(() => Manga)
  public async removeManga(
    @Args('id', { type: () => ID }) id: Schema.Types.ObjectId,
  ) {
    return this.mangaService.remove(id);
  }
}
