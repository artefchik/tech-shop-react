const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const UserDto = require('../dtos/userDto');
const tokenService = require('./tokenService');
const ApiError = require('../exceptions/apiError');

class UserService {
    async registration(email, password, username) {
        const userFromDb = await UserModel.findOne({ email });
        if (userFromDb) {
            return ApiError.BadRequest(`Пользователь с таким ${email} уже существует.`);
        }
        const name = await UserModel.findOne({ username });
        if (name) {
            return ApiError.BadRequest(
                `Пользователь с таким ${username} уже существует.`,
            );
        }
        const hasPassword = await bcrypt.hash(password, 4);
        const activatedLinkEmail = hasPassword;
        const user = await UserModel.create({
            email,
            username,
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
            return ApiError.Unauthorized();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenInDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenInDb) {
            return ApiError.Unauthorized();
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

    async getOne(id) {
        const user = await UserModel.findById(id);
        const userDto = new UserDto(user);
        return userDto;
    }
}

module.exports = new UserService();
