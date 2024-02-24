const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const UserDto = require('../dtos/userDto');
const tokenService = require('./tokenService');

class UserService {
    async registration(email, password) {
        const userFromDb = await UserModel.findOne({ email });
        if (userFromDb) {
            throw new Error(`Пользователь с таким ${email} уже существует.`);
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

    async login(req, res, next) {
        try {
        } catch (e) {}
    }

    async logout(req, res, next) {
        try {
        } catch (e) {}
    }

    async refresh(req, res, next) {
        try {
        } catch (e) {}
    }
}

module.exports = new UserService();
