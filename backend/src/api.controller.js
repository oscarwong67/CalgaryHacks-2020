import { Controller, Dependencies, Get, Bind, Param } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { QuestionsService } from './questions.service'

@Controller('api')
@Dependencies(TopicsService, QuestionsService)
export class ApiController {
  constructor(topicsService, questionsService) {
    this.topicsService = topicsService;
    this.questionsService = questionsService;
  }

  @Get('randomQuestion/:topic')
  @Bind(Param('topic'))
  getRandomQuestion(topic) {
    return this.questionsService.getRandomQuestion(topic);
  }
}
