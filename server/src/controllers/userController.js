const { validationResult } = require('express-validator');
const UserService = require('../services/userService');
const ApiError = require('../exceptions/apiError');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('ошибка валидации'));
            }
            const { email, password, username } = req.body;
            const userData = await UserService.registration(email, password, username);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 20 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 20 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return next(ApiError.BadRequest('ошибка валидации'));
            }
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(token);
        } catch (e) {
            console.log(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return next(ApiError.BadRequest('ошибка валидации'));
            }
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 20 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UserController();
