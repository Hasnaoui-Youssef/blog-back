import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { PostService } from 'src/post/post.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService, private readonly postService : PostService ) {}

  @Get()
  async findSubjects(){
    return await this.subjectService.getAllSubjects();
  }

  @Get(":name/posts")
  async findPostsForSubject(@Param('name') name : string){
    return await this.postService.findForSubject(name);
  }

  @Post(":name")
  async createSubject(@Param('name') name : string){
    return await this.subjectService.createSubject(name);
  }

  @Patch(":name")
  async renameSubject(@Param('name') oldName : string, @Query('new-name') newName : string){
    return await this.subjectService.renameSubject(oldName, newName);
  }

  @Delete(":name")
  async deleteSubject(@Param('name') name : string){
    return await this.subjectService.deleteSubject(name);
  }
}
