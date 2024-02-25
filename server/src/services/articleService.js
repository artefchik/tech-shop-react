const ArticleModel = require('../models/articleModel');
const ApiError = require('../exceptions/apiError');

class ArticleService {
    async getAll(query) {
        const limit = query.limit ?? 0;
        const page = query.page ?? 0;
        const order = query.order ?? 1;
        const sort = query.sort ?? 'views';
        const articles = await ArticleModel.find()
            .skip(page * limit)
            .limit(limit)
            .sort({ [sort]: order });

        return articles;
    }

    async getById(id) {
        const article = await ArticleModel.findById(id);
        if (!article) {
            return ApiError.BadRequest(`Статьи с таким ${id} не найдено`);
        }
        return article;
    }
}
module.exports = new ArticleService();
