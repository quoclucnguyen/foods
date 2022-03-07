import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AbstractInput {
    @Field(() => String, { nullable: true })
    createdBy?: string;
}