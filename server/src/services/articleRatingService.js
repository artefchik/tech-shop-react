const { ObjectId } = require('mongodb');
const ArticleRatingModel = require('../models/articleRating');
const ApiError = require('../exceptions/apiError');

class ArticleRatingService {
    async getById(id) {
        const rating = await ArticleRatingModel.findOne({
            articleId: new ObjectId(id),
        });
        return rating;
    }

    async addRating(rating) {
        const { articleId, rate, feedback, userId } = rating;
        if (!articleId || !userId) {
            throw ApiError.BadRequest();
        }
        const createdRating = await ArticleRatingModel.create({
            articleId,
            rate,
            feedback,
            userId,
        });

        return createdRating;
    }
}

module.exports = new ArticleRatingService();
