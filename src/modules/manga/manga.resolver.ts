import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';

import { MangaService } from './manga.service';
import { Manga } from './entities/manga.entity';
import { CreateMangaInput } from './dto/create-manga.input';
import { UpdateMangaInput } from './dto/update-manga.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'modules/auth/guards';
import { Schema } from 'mongoose';

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
  public async findAll() {
    return this.mangaService.findAll();
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
