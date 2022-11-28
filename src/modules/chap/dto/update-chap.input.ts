import { CreateChapInput } from './create-chap.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChapInput extends PartialType(CreateChapInput) {
  @Field(() => Int)
  id: number;
}
