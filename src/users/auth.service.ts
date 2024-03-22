import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { scrypt as _nodeScrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { SignInAuthDto } from "./dto/signin-auth.dto";
import { SignUpAuthDto } from "./dto/signup-auth.dto";
import { UsersService } from "./users.service";

const scrypt = promisify(_nodeScrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Sign up a user.
   *
   * @param {SignUpAuthDto} body - The sign up authentication data.
   * @return {Promise<any>} The result of the user creation.
   */
  async signUp(@Body() body: SignUpAuthDto) {
    const { email, password } = body;

    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException("Email in use");
    }

    // Hash password
    const salt = randomBytes(8).toString("hex");
    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

    const result = await this.usersService.create({
      email,
      password: `${salt}.${hashedPassword.toString("hex")}`,
    });

    return result;
  }

  /**
   * Sign in a user with the provided email and password.
   *
   * @param {SignInAuthDto} body - The request body containing the email and password.
   * @return {Promise<User>} - The user object if the sign-in is successful.
   * @throws {NotFoundException} - If the user with the provided email is not found.
   * @throws {BadRequestException} - If the provided password is incorrect.
   */
  async signIn(@Body() body: SignInAuthDto) {
    const { email, password } = body;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const [salt, storedHash] = user.password.split(".");
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString("hex")) {
      throw new BadRequestException("Wrong password");
    }

    return user;
  }
}
