import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  messagesRepository: MessagesRepository;
  constructor(messagesRepository: MessagesRepository) {
    // Services is creating its own dependencies
    this.messagesRepository = messagesRepository;
  }

  findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  findAll() {
    return this.messagesRepository.findAll();
  }

  create(content: string) {
    return this.messagesRepository.create(content);
  }
}
