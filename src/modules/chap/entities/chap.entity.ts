import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Chap {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
