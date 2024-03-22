import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { Serialize } from "src/interceptors/serialize.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@Serialize<UserDto>(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Sign up a new user
   */
  @Post("/signup")
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  /**
   * Fetch all users
   */
  @Get()
  async findAll(@Query("email") email: string) {
    return {
      users: await this.usersService.findAll(email),
    };
  }

  /**
   * Fetch a single user
   */
  @Get("/:id")
  async findOne(@Param("id") id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  /**
   * Update a user
   */
  @Put("/:id")
  async update(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  /**
   * Remove a user
   */
  @Delete("/:id")
  async remove(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
