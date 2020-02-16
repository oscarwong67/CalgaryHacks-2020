import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiController } from './api.controller';
import { AppService } from './app.service';
import { TopicsService } from './topics.service';
import { QuestionsService } from './questions.service';

@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [AppService, TopicsService, QuestionsService],
})
export class AppModule {}
