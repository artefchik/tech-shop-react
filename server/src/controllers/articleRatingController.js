const ApiError = require('../exceptions/apiError');
const articleRatingService = require('../services/articleRatingService');

class ArticleRatingController {
    async addRating(req, res, next) {
        try {
            const { id } = req.params;
            const { body } = req;
            if (!body || !id) {
                return next(ApiError.BadRequest('ошибка'));
            }

            const createdRating = await articleRatingService.addRating(body);
            return res.json(createdRating);
        } catch (e) {
            return next(ApiError.BadRequest('ошибка'));
        }
    }
}

module.exports = new ArticleRatingController();
