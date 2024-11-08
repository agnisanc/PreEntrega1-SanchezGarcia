import { UserService } from "../services/user.service";
import { ProductService } from "../services/product.service";
import { faker } from "@faker-js/faker";
import { uuid } from "uuidv4";
import { createHash } from "../utils/hash";
import { config } from "../config/config.js";

class DataMock {
    async createUsers (req, res, next) {
        const { n } = req.params;
        try {
            for ( let i = 0; i < n; i++) {
                const first_name = faker.person.firstName().toLocaleLowerCase();
                const last_name = faker.person.lastName().toLocaleLowerCase();
                const age = Mathc.floor(Math.random() * (65 - 18 + 1)) + 18;
                const hashPassword = await createHash(config.PASSWORD_USERS_MOCK);

                const data = {
                    first_name,
                    last_name,
                    email: first_name + last_name + "@" + config.MODE + "model" + ".com",
                    age,
                    password: hashPassword
                };

                await UserService.createUser(data);
            }
            res.status(201).json({
                response: "The user was created!", message: `The total of users created are: ${n}`
            })
        } catch (error) {
            next(error);
        }
    }
}

export const dataMock = new DataMock();
