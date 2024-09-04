import { productModel } from "../models/product.model.js"

export class ProductService {
    static async getAllProducts() {
        return await productModel.find();
    }

    static async getPorductById(id) {
        return await productModel.create(product);
    }

    static async create(product) {
        return await productModel.create(product);
    }

    static async delete(id) {
        return await productModel.deleteOne({ _id: id});
    }

    static async discountStock(id, quantity) {
        return await productModel.updateOne(
            {
                _id: id,
            },
            {
                $inc: {
                    stock: -quantity,
                },
            }
        );
    }
}