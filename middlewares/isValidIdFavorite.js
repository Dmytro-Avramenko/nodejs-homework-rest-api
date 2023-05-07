const {HttpError} = require("../helpers");

const isValidIdFavorite = schema => {
    const func = (req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, { message: 'missing field favorite' }));
        }
        next()
    }

    return func;
}

module.exports = isValidIdFavorite;