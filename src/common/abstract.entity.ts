import { Field, ObjectType } from '@nestjs/graphql';

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
}
