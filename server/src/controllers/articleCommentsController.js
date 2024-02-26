const ApiError = require('../exceptions/apiError');
const articleCommentsService = require('../services/articleCommentsService');

class ArticleCommentsController {
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest());
            }
            const comments = await articleCommentsService.getById(id);
            return res.json(comments);
        } catch (e) {
            return next(ApiError.BadRequest());
        }
    }

    async createComment(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest('not articles'));
            }
            const comments = await articleCommentsService.createComment(req.body);
            return res.json(comments);
        } catch (e) {
            console.log(e);
        }
    }

    async deleteComment(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest('not articles'));
            }
            const deleteComment = await articleCommentsService.deleteComment(id);
            res.json(deleteComment);
        } catch (e) {
            console.log(e);
        }
    }

    async updateComment(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest('not articles'));
            }
            const updatedComments = await articleCommentsService.updateComment(req.body);
            res.json(updatedComments);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new ArticleCommentsController();
