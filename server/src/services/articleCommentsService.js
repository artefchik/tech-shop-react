const { ObjectId } = require('mongodb');
const ArticleCommentsModel = require('../models/articleComments');
const ApiError = require('../exceptions/apiError');
const ArticleService = require('./articleService');

class ArticleCommentsService {
    async getById(articleId) {
        const commentsData = await ArticleCommentsModel.findOne({
            articleId: new ObjectId(articleId),
        });
        if (!commentsData) {
            return ApiError.BadRequest('Комментарии не найдены');
        }
        return commentsData;
    }

    async createComment(commentData) {
        const { articleId, userId, text } = commentData;
        if (!articleId || !userId || !text) {
            return ApiError.BadRequest();
        }
        // const article = await ArticleService.getById(articleId);
        const commentsData = await ArticleCommentsModel.findOne({
            articleId: new ObjectId(articleId),
        });
        if (!commentsData) {
            const newComment = await ArticleCommentsModel.create({
                articleId: new ObjectId(articleId),
                comments: [
                    {
                        userId: new ObjectId(userId),
                        text,
                    },
                ],
            });
            return newComment;
        }
        const comment = await ArticleCommentsModel.updateOne(
            { articleId: new ObjectId(articleId) },
            {
                $push: {
                    comments: {
                        $each: [{ text, userId: new ObjectId(userId) }],
                        $position: 0,
                    },
                },
            },
        );
        return comment;
    }

    async updateComment(commentData) {
        const { articleId, userId, text, commentId } = commentData;
        if (!articleId || !userId || !text) {
            return ApiError.BadRequest();
        }
        const updatedComment = await ArticleCommentsModel.updateOne(
            {
                articleId: new ObjectId(articleId),
                'comments._id': new ObjectId(commentId),
            },
            { $set: { 'comments.$.text': text } },
        );
        return updatedComment;
    }

    async deleteComment(comment, commentId) {
        const { articleId } = comment;
        console.log(comment);
        const deleteComment = await ArticleCommentsModel.updateOne(
            { articleId: new ObjectId(articleId) },
            { $pull: { comments: { _id: new ObjectId(commentId) } } },
        );
        return deleteComment;
    }
}

module.exports = new ArticleCommentsService();
