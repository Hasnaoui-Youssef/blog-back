import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Subject extends Document {
    @Prop({required : true, unique : true})
    name : string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);