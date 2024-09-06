import { userModel }  from "../models/user.model.js";

export class UserController {
    static async getAll(req, res) {
        try {
            const users = await userModel.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({error: "An error occured while trying to obtain the users.", details: error.message})
        }
    }

    static async getById(req, res) {
        try {
            const { id } =req.params;
            const users = await userModel.findById(id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "An error occured while trying to obtain the users.", details: error.message })
        }
    }

    static async delete(req, res) {
        try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);
        res.json(user);
        } catch (error) {
        res.status(500).json({error: "An error occured while trying to delete the user.", details: error.message});
        }
    }

    static async update(req, res) {
        try {
        const { id } = req.params;
        const { first_name, last_name, email, age, password } = req.body;
    
        const user = await userModel.findByIdAndUpdate(id, {
            first_name,
            last_name,
            email,
            age,
            password,
        });
    
        res.json(user);
        } catch (error) {
        res.status(500).json({error: "An error occured while trying to update the user.", details: error.message});
        }
    }
}