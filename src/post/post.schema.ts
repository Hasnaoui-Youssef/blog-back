import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps : true})
class Comment{

    @Prop({required : true})
    content : string;

    @Prop({required : true})
    author : string;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps : true })
export class Post extends Document{

    @Prop({required : true})
    title : string;

    @Prop({required : true})
    content : string;
   
    @Prop({ type : [CommentSchema], default : [] , ref : "comments" })
    comments : Comment[];

    @Prop({required : true})
    author : string;

    @Prop({type : Types.ObjectId, required : true, ref : "subjects" })
    subject : Types.ObjectId;

}

export const PostSchema = SchemaFactory.createForClass(Post);