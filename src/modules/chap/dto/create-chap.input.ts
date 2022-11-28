import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChapInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
