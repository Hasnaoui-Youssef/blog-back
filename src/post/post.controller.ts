import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() createPostDto : CreatePostDTO){
    return await this.postService.createPost(createPostDto);
  }

  @Post("comment/:id")
  async createComment(@Param('id') id : string,@Body() createCommentDto : CreateCommentDto){
    return await this.postService.addComment(id, createCommentDto);
  }

  @Patch("comment/:id")
  async updateComment(@Param('id') id : string, @Query('comment') commentId : string, @Body() body : {content : string}){
    return await this.postService.updateComment(id, commentId, body.content);
  }

  @Delete("comment/:id")
  async deleteComment(@Param('id') id : string, @Query('comment') commentId : string){
    return await this.postService.deleteComment(id, commentId);
  }

  @Get(":id")
  async getPost(@Param("id") id : string){
    return await this.postService.getPostById(id);
  }

  @Delete(":id")
  async deletePost(@Param("id") id : string){
    return await this.postService.deletePost(id);
  }

  @Patch(":id")
  async updatePost(@Param("id") id : string, @Body() updatePostDto : UpdatePostDto) {
    return await this.postService.updatePost(id, updatePostDto);
  }
}
