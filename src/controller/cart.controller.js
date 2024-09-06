import { v4 as uuid } from "uuid";
import { cartModel } from "../models/cart.model.js";
import { productModel }  from "../models/product.model.js";
import { ProductService } from "../services/product.service.js";
import { ticketModel } from "../models/tickets.model.js";

export class CartController {
    static async getCartById(req, res) {
        try { 
            const { id } = req.params;
            const cart = await cartModel.findById(id);

            if (!cart) {
                return res.status(404).json({error: "The cart was not found"})
            }
            res.json(cart);
        } catch (error) {
            res.status(500).json({error: "An error occured while trying to recover the cart", details: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { product } = req.body;
            const cart = await cartModel.create( { products });

            res.status(201).json(cart);
        } catch (error) {
            res.status(500).json({ error: "An error occured while trying to create the cart.", details: error.message });
        }
    }

    static async addProduct(req, res) {
        try {
            const { productId, quantity } = req.body;
            const productExistence = await productModel.findById(productId);

            if (!productExistence) {
                return res.status(400).json({error: "Product was not found."});
            }

            const cart = await cartModel.findById(req.params.id);

            if(!cart) {
                return res.status(404).json({error: "The cart was not found."});
            }

            const postroductInCart = cart.products.find((p) => {
                console.log(p);
                return p.product._id.toString() === productId;
            });

            if (productInCart) {
                cart.products.find((p) => {
                console.log(p);
                return p.product._id.toString() === productId;
                }).quantity += quantity;

                cart.save();
                return res.json(cart);
            }
        } catch (error) {
            res.status(500).json({ error: "An error occured while trying to add the product to the cart.", details: error.message })
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const cart = await cartModel.findByIdAndDelete(id);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: "An error occured while trying to delete the cart.", details: error.message })
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id, productId } = req.params;
            const cart = await cartModel.findById(id);

            const productInCart = cart.products.find((p) => p.product === productId);

            if (productInCart) {
                cart.products = cart.products.filter((p) => p.product !== productId);
                cart.save();
        
                res.json(cart);
            } else {
                return res.status(404).json({error: "The product was not found.",});
            }
    } catch (error) {
        res.status(500).json({error: "An error occured while trying to delete the product from the cart.", details: error.message });
    }
}

static async deleteAllProducts(req, res) {
    try {
    const { id } = req.params;
    const cart = await cartModel.findById(id);

    cart.products = [];
    cart.save();

    res.json(cart);
    } catch (error) {
    res.status(500).json({error: "An error occured while trying to delete all the products from the cart.o", details: error.message,});
    }
}

static async purchase(req, res) {
    try {
        const { id } = req.params;
        const cart = await cartModel.findById(id).populate("products.product");
    
    if (!cart) {
        return res.status(404).json({error: "The cart was not found"})
    }

    const productsWithNoStock = [];

    cart.products.forEach((p) => {
        if (p.porudct?.stock < p.quantity) {
            productsWithNoStock.push({
                productId: p.product._id,
                productName: p.product.name,
                quantity: p.quantity,
                stock: p.product.stock,
            });
        }
    });

    if (productsWithNoStock.length > 0) {
        return res.status(400).json({ error: "No products", details: productsWithNoStock});
    }

    const promises = cart.products.map((p) => {
        return ProductsService.discountStock(p.product._id, p.quantity);
    });

    await Promise.all(promises);

    const amount = cart.products.reduce(
        (acc, curr) => acc + curr.quantity * curr.product.price, 0
    );

    const ticket = await ticketModel.create({
        code: uuid(),
        purchase_datetime: new Date(),
        amount,
        purchaser: req.user._id,
    });
    } catch (error) {
        res.status(500).json({ error: "An error occured while finishing your purchase, please try again.", details: error.message})
    }
}

}