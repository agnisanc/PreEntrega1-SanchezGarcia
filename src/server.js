import express from 'express';
import { connectDB } from './config/db.connection.js';
import passport from "passport";
import { initializePassport } from "./config/passport.config.js"
import morgan from "morgan";
import compression from "express-compression";
import loggerWinston from "./middlewares/winstonlogger.middleware.js";
import winstonLogger from './utils/winston.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import { config } from './config/config.js';
import routes from "./routes/index.router.js"

const PORT = config.PORT


const app = express();

//MongoDB

connectDB();

//Configuracion de app

app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(morgan("dev"));
app.use(compression({brotli: { enabled: true, zlib: {} },}));
app.use(loggerWinston);
app.use(errorHandler)

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
    winstonLogger.info(`Server connected in port ${PORT}.`);
});

