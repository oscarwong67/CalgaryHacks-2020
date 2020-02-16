import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionsService {
    getRandomQuestion(topic) {
        return topic;
    }
}
