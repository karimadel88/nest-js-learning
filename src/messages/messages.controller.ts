import {
  Body,
  Controller,
  Get,
  Injectable,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.services';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor(messagesService: MessagesService) {
    this.messagesService = messagesService;
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }

    return message;
  }
}
