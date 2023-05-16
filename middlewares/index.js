const validateBody = require("./validateBody");
const isValidId = require("./isValidId")
const isValidIdFavorite = require("./isValidIdFavorite")
const authenticate = require("./authenticate")
const upload = require("./upload")

module.exports = {
    validateBody,
    isValidId,
    isValidIdFavorite,
    authenticate,
    upload,
}