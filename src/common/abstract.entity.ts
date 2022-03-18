import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AbstractEntity {
    @Field(() => String)
    id: string;

    @Field(() => String, { nullable: true })
    createdBy?: string;

    @Field(() => String, { nullable: true })
    updatedBy?: string;

    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;

    @Field(() => Boolean, { defaultValue: true })
    isActive: boolean;

    @Field(() => String, { nullable: true })
    status: string;
}

@InputType()
export class Pagination {
    @Field(() => Int, { nullable: true })
    take: 10;

    @Field(() => Int, { nullable: true })
    skip: 0;
}

@ObjectType()
export abstract class QueryResult {
    @Field(() => Int)
    total: number;

    @Field(() => [AbstractEntity])
    items: AbstractEntity[];
}