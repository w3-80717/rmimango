const { ValidationError } = require("sequelize");

/**
 * 
 * @param {Error|ValidationError} err 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
exports.errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof ValidationError && err.errors) {
        const errorResponse = {
            errors: err.errors.map((err) => ({
                message: err.message,
                field: err.path,
            }))
        };
        return res.status(400).json(errorResponse);
    }
    res.status(res.statusCode < 400 ? 500 : res.statusCode).json({ error: err.message });

}