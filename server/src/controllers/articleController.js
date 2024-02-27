const ArticleService = require('../services/articleService');
const ApiError = require('../exceptions/apiError');

class ArticleController {
    async getAll(req, res, next) {
        try {
            const { query } = req;
            const articles = await ArticleService.getAll(query);
            return res.json(articles);
        } catch (e) {
            return ApiError.BadRequest('ничего не найдено');
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest(`Статьи с таким ${id} не найдено`));
            }
            const article = await ArticleService.getById(id);
            return res.json(article);
        } catch (e) {
            return next(ApiError.BadRequest(`Статьи с таким  не найдено`));
        }
    }
}
module.exports = new ArticleController();
