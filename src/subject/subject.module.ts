import { forwardRef, Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './subject.schema';
import { PostModule } from 'src/post/post.module';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name : Subject.name, schema : SubjectSchema }
    ]),
    forwardRef(() => PostModule)
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService]
})
export class SubjectModule {}
