const ApiError = require('../exceptions/apiError');
const TokenService = require('../services/tokenService');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.NotAuthorized());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.NotAuthorized());
        }
        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.NotAuthorized());
        }
        req.body = userData;
        next();
    } catch (e) {
        return next(ApiError.NotAuthorized());
    }
};
