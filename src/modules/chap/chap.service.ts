import { Injectable } from '@nestjs/common';
import { CreateChapInput } from './dto/create-chap.input';
import { UpdateChapInput } from './dto/update-chap.input';

@Injectable()
export class ChapService {
  create(createChapInput: CreateChapInput) {
    return 'This action adds a new chap';
  }

  findAll() {
    return `This action returns all chap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chap`;
  }

  update(id: number, updateChapInput: UpdateChapInput) {
    return `This action updates a #${id} chap`;
  }

  remove(id: number) {
    return `This action removes a #${id} chap`;
  }
}
