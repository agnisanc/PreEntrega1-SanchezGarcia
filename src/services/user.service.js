import { userModel } from "../models/user.model.js";

export class UserService {
    static async getAllUsers() {
        return await userModel.find();
    }

    static async getUserById(id) {
        return await userModel.findUserById(id);
    }

    static async create(user) {
        return await userModel.create(user);
    }
}