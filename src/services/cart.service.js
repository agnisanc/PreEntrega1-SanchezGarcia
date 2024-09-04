import { cartModel } from "../models/cart.model.js";

export class CartService {
    static async getCartById(id) {
        return await userModel.findUserById(id);
    }

    static async create(cart) {
        return await cartModel.create(cart);
    }
}