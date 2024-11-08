import winstonLogger from "../utils/winston.js";
import errors from "../utils/errors/errors.js";

function errorHandler(error, req, res, next) {
    const message = `${req.method} ${req.url} - ${error.message.toUpperCase()}`;

    const details = error.details || null;

    if (error.statusCode) {
    winstonLogger.error(message + (details ? ` - Details: ${details}` : ""));
    } else {
    winstonLogger.fatal(message + (details ? ` - Details: ${details}` : ""));
    }

    const { fatal } = errors;
    return res.status(error.statusCode || fatal.statusCode).json({
    message: error.message || fatal.message,
    details: details,
    });
}

export default errorHandler