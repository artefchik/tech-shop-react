const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const UserDto = require('../dtos/userDto');
const tokenService = require('./tokenService');
const ApiError = require('../exceptions/apiError');

class UserService {
    async registration(email, password) {
        const userFromDb = await UserModel.findOne({ email });
        if (userFromDb) {
            return ApiError.BadRequest(`Пользователь с таким ${email} уже существует.`);
        }
        const hasPassword = await bcrypt.hash(password, 4);
        const activatedLinkEmail = hasPassword;
        const user = await UserModel.create({
            email,
            password: hasPassword,
            activatedLinkEmail,
        });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return ApiError.BadRequest('user is not defined');
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            return ApiError.BadRequest('the password is incorrect');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.NotAuthorized();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenInDb) {
            throw ApiError.NotAuthorized();
        }
        const user = await UserModel.findById(userData.id);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }
}

module.exports = new UserService();