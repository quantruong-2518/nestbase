import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgType {
  @Field({ nullable: true, defaultValue: 0 })
  public page?: number;

  @Field({ nullable: true, defaultValue: 5 })
  public offset: number;
}
