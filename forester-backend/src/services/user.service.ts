import { UserModel, User } from "../models/user.model";
import { ForesterError, HttpStatusCode } from "../exceptions/foresterError";
import KeycloakService from "./keycloak.service";
import dotenv from 'dotenv';

dotenv.config();

const keycloakUrl = process.env.KEYCLOAK_BASE_URL;
const keycloakToken = process.env.KEYCLOAK_TOKEN;

export default class UserService {

    private keycloakService = new KeycloakService();

    private emailRegex: RegExp = /\S+@\S+\.\S+/;

    getUsers = async (): Promise<User[]> => {
        return await UserModel.find().exec();
    }

    getUser = async (uuid: string): Promise<User | null> => {

        // check if user exists
        const response = await UserModel.find({ uuid }).exec();
        if (response.length === 0) {
            throw new ForesterError({
                httpStatusCode: HttpStatusCode.NOT_FOUND,
                description: 'User not found',
                isOperational: true
            });
        }

        return response[0];
    }

    getUserByEmail = async (email: string): Promise<User | null> => {
        // check if user exists
        const response = await UserModel.find({ email }).exec();
        if (response.length === 0) {
            throw new ForesterError({
                httpStatusCode: HttpStatusCode.NOT_FOUND,
                description: 'User not found',
                isOperational: true
            });
        }

        return response[0];
    }

    createUser = async (newUser: User) => {
        // check if email is of valid format
        if (!this.emailRegex.test(newUser.email) || newUser.email == null) {
            throw new ForesterError({
                httpStatusCode: HttpStatusCode.BAD_REQUEST,
                description: 'Email is not of valid format',
                isOperational: true
            });
        }

        // check if password matches password confirmation
        if (newUser.password !== newUser.passwordConfirm) {
            throw new ForesterError({
                httpStatusCode: HttpStatusCode.BAD_REQUEST,
                description: 'Password does not match password confirmation',
                isOperational: true
            });
        }

        // check if user already exists by checking if error is thrown when trying to get user
        try {
            await this.getUserByEmail(newUser.email);
            throw new ForesterError({
                httpStatusCode: HttpStatusCode.CONFLICT,
                description: 'User already exists',
                isOperational: true
            });
        } catch (error) {
            // error thrown, check if it is a 404 error
            if (error instanceof ForesterError) {
                // if it is a 404 error, create the user
                if (error.httpStatusCode === HttpStatusCode.NOT_FOUND) {
                    // create user in keycloak and get uuid (keycloak is literally trash)
                    newUser.uuid = await this.keycloakService.createUser(newUser);

                    // create user in database
                    const response = await UserModel.create(newUser);

                    return response;
                } else {
                    throw error;
                }
            } else {
                throw error;
            }
        }
    }

    updateUser = async (uuid: string, updatedUser: User) => {
        // check if user exists
        await this.getUser(uuid);

        // check input
        if (!this.emailRegex.test(updatedUser.email) || updatedUser.email == null) {
            throw new ForesterError({
                httpStatusCode: HttpStatusCode.BAD_REQUEST,
                description: 'Email is not of valid format',
                isOperational: true
            });
        }

        // check if password matches password confirmation
        if (updatedUser.password !== updatedUser.passwordConfirm) {
            throw new ForesterError({
                httpStatusCode: HttpStatusCode.BAD_REQUEST,
                description: 'Password does not match password confirmation',
                isOperational: true
            });
        }

        // update user in keycloak, then in database
        await this.keycloakService.updateUser(uuid, updatedUser);
        const response = await UserModel.updateOne({ uuid }, updatedUser);
        
        return response;
    }

    deleteUser = async (uuid: string) => {
        // check if user exists
        await this.getUser(uuid);

        // delete user in keycloak, then in database
        await this.keycloakService.deleteUser(uuid);
        const response = await UserModel.findOneAndDelete({ uuid });
        return response;
    }


}