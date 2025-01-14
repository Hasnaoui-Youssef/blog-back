import { IsString } from "class-validator";

export class CreatePostDTO{

    @IsString()
    title : string;

    @IsString()
    content : string;

    @IsString()
    author : string;

    @IsString()
    subject : string;
}
