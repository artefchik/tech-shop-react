const jwt = require('jsonwebtoken');
const TokenModel = require('../models/tokenModel');

class TokenService {
    generateTokens(data) {
        const accessToken = jwt.sign(data, process.env.JWT_ACCESS_KEY, {
            expiresIn: '1m',
        });
        const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_KEY, {
            expiresIn: '2m',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = TokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken });
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();
