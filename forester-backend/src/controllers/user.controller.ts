import { User } from "./../models/user.model";
import { Get, Post, Route, Tags, Path, Controller, SuccessResponse, Response, Body, Put, Delete } from "tsoa";
import UserService from "../services/user.service";
import { ForesterError } from "../exceptions/foresterError";
import { HttpStatusCode } from "axios";

@Route("users")
@Tags("User Controller Routes")
export class UserController extends Controller {
  userService: UserService = new UserService();

  @Get("/")
  @SuccessResponse("200", "OK")
  public async getUsers(): Promise<User[]> {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      throw error;
    }
  }

  @Get("{uuid}")
  @SuccessResponse("200", "OK")
  @Response<ForesterError>(HttpStatusCode.NotFound, "User not found")
  public async getUser(@Path() uuid: string): Promise<User | null> {
    try {
      return await this.userService.getUser(uuid);
    } catch (error) {
      throw error;
    }
  }

  @Post("/")
  @SuccessResponse("201", "Created")
  @Response<ForesterError>(HttpStatusCode.BadRequest, "Bad Request")
  @Response<ForesterError>(HttpStatusCode.Conflict, "User already exists")
  public async createUser(@Body() body: User): Promise<string> {
    try {
      const response: User = await this.userService.createUser(body);
      return "Created user account successfully: " + response.uuid;
    } catch (error) {
      throw error;
    }
  }

  @Put("{uuid}")
  @SuccessResponse("200", "Updated")
  @Response<ForesterError>(HttpStatusCode.BadRequest, "Bad Request")
  @Response<ForesterError>(HttpStatusCode.NotFound, "User not found")
  public async updateUser(@Path() uuid: string, @Body() body: User): Promise<string> {
    try {
      await this.userService.updateUser(uuid, body);
      return "Updated user account successfully";
    } catch (error) {
      throw error;
    }
  }

  @Delete("{uuid}")
  @SuccessResponse("200", "Deleted")
  @Response<ForesterError>(HttpStatusCode.NotFound, "User not found")
  public async deleteUser(@Path() uuid: string): Promise<string> {
    try {
      await this.userService.deleteUser(uuid);
      return "Deleted user account successfully";
    } catch (error) {
      throw error;
    }
  }
}
