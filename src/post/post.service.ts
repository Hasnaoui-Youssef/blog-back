import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './post.schema';
import { Model } from 'mongoose';
import { SubjectService } from 'src/subject/subject.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private readonly PostModel : Model<Post>,
        private readonly subjectService : SubjectService
    ) {}

    async createPost(createPostDto : CreatePostDTO) : Promise<Post> {
        const subjectId = await this.subjectService.getSubjectId(createPostDto.subject);
        const postDto  : any = { ... createPostDto };
        postDto.subject = subjectId;
        const post = new this.PostModel(postDto);
        const saved = await post.save();
        return saved;
    }

    async findForSubject(subject : string){
        const subjectId = await this.subjectService.getSubjectId(subject);
        const posts = await this.PostModel.find({subject : subjectId})
        return {
            posts : posts.map((post) => {
                        return {
                            author : post.author,
                            title : post.title,
                            id : post._id
                        }
                    }),
            postsNumber : posts.length,
            };
    }
    async findAllBySubject(){
        const posts =  await this.PostModel.aggregate([
            {
                $group : {
                    _id : '$subject',
                    posts : {
                        $push : {
                            _id : '$_id',
                            author : '$author',
                            title : '$title'
                        }
                    }
                }
            },
            {
                $project : {
                    subject: '$_id',
                    posts : 1,
                    _id : 0,
                }
            }
        ]);
        const idk = await Promise.all(posts.map(async (elem) => {
            const subjectId = elem.subject;
            const subject = await this.subjectService.getSubjectById(subjectId);
            return {
                    posts : elem.posts,
                    subject : {
                        name : subject.name,
                        _id : subjectId,
                    }
                }
        }));
        return idk;
    }

    async getPostById(id : string){
        const post = await this.PostModel.findById(id);
        return post;
    }

    async updatePost(id : string, updatePostDto : UpdatePostDto) {
        const post = await this.PostModel.findByIdAndUpdate(id, {
            $set :  updatePostDto
        }, {new : true} ).exec();
        return post;
    }

    async deletePost(id : string){
        const post = await this.PostModel.findByIdAndDelete(id);
        return post;
    }

    async addComment(id : string, commentDto : CreateCommentDto){
        const post = await this.PostModel.findByIdAndUpdate(id, {
            $push : { comments : commentDto }
        }, { new : true })
        .exec()
        return post;
    }

    async deleteComment(id : string, commentId : string){
        const post = await this.PostModel.findByIdAndUpdate(id, {
            $pull : {comments : {_id : commentId }}
        }, { new : true })
        .exec();
        return post;
    }

    async updateComment( id : string, commentId : string, content : string){
        const post = await this.PostModel.findOneAndUpdate( { _id : id, "comments._id" : commentId }, {
            $set : { "comments.$.content" : content }
        }, {new : true, runValidators : true }).exec();
        return post;
    }
}
