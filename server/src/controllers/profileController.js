const ApiError = require('../exceptions/apiError');
const ProfileService = require('../services/profileService');

class ProfileController {
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest('Пользовать с не найден'));
            }
            const profile = await ProfileService.getById(id);
            res.json(profile);
        } catch (e) {
            return next(ApiError.BadRequest('ошибка'));
        }
    }

    async updateProfile(req, res, next) {
        try {
            const { body } = req;
            const { id } = req.params;
            if (!body || !id) {
                return next(ApiError.BadRequest('ошибка'));
            }
            const updateProfile = await ProfileService.updateProfile(body, id);
            res.json(updateProfile);
        } catch (e) {
            return next(ApiError.BadRequest('ошибка'));
        }
    }
}

module.exports = new ProfileController();
