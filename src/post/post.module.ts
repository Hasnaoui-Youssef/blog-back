import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name : Post.name, schema : PostSchema}
    ]),
    forwardRef(() => SubjectModule)
  ],
  controllers: [PostController],
  providers: [PostService],
  exports : [PostService]
})
export class PostModule {}
