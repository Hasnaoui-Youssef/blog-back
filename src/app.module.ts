import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PostModule,
    SubjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
