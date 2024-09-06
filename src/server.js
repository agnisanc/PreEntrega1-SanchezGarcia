import express from 'express';
import mongoose from "mongoose"
import passport from "passport";
import morgan from "morgan";
import { initializePassport } from "./config/passport.config.js"
import { config } from "./config/config.js"
import routes from "./routes/index.router.js"


const PORT = 8080;

const app = express();

//MongoDB

mongoose.connect(config.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("An error occured while trying to connect MongoDB.")
    })


//Configuracion de app

app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(morgan("dev"));

//Passport

initializePassport();
app.use(passport.initialize());

//Routes

app.use("/api", routes)
app.use("*", (req, res) => {
    res.status(404).json({ message: "Page not found.", error: "Not found" })
});


//Puerto

app.listen(PORT, () => {
    console.log(`Server listening port http://localhost:${PORT}`);
});

