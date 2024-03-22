import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
} from "@nestjs/common";
import { Serialize } from "src/interceptors/serialize.decorator";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInAuthDto } from "./dto/signin-auth.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@Serialize<UserDto>(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Sign up a new user
   */
  @Post("/signup")
  async create(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body);
    session.userId = user.id;
    return user;
  }

  /**
   * Sign in
   */
  @Post("/signin")
  async signIn(@Body() body: SignInAuthDto, @Session() session: any) {
    const user = await this.authService.signIn(body);
    session.userId = user.id;
    return user;
  }

  /**
   * Sign out
   */
  @Post("/signout")
  signOut(@Session() session: any) {
    session.userId = null;
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
