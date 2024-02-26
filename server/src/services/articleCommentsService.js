const { ObjectId } = require('mongodb');
const ArticleCommentsModel = require('../models/articleComments');
const ApiError = require('../exceptions/apiError');
const ArticleService = require('./articleService');
const UserService = require('./userService');
const CommentDto = require('../dtos/commentDto');
const UserDto = require('../dtos/userDto');

class ArticleCommentsService {
    async getById(articleId) {
        const commentsData = await ArticleCommentsModel.find({
            articleId: new ObjectId(articleId),
        });

        if (!commentsData) {
            throw ApiError.BadRequest('Комментарии не найдены');
        }

        async function processCommentsWithUsers(commentsData) {
            const commentsWithUsers = [];

            for (const comment of commentsData) {
                try {
                    const user = await UserService.getOne(comment.userId);
                    const commentDto = new CommentDto(comment);
                    const userDto = new UserDto(user);
                    commentsWithUsers.push({ ...commentDto, user: { ...userDto } });
                } catch (error) {
                    console.error(`Error processing comment: ${error.message}`);
                }
            }

            return commentsWithUsers;
        }
        return await processCommentsWithUsers(commentsData);
    }

    async createComment(commentData) {
        const { articleId, userId, text } = commentData;
        if (!articleId || !userId || !text) {
            return ApiError.BadRequest();
        }
        const newComment = await ArticleCommentsModel.create({
            articleId: new ObjectId(articleId),
            userId: new ObjectId(userId),
            text,
        });
        return newComment;
    }

    async updateComment(commentData) {
        const { articleId, userId, text, id } = commentData;
        if (!articleId || !userId || !text) {
            return ApiError.BadRequest();
        }
        const updatedComment = await ArticleCommentsModel.updateOne(
            {
                _id: new ObjectId(id),
            },
            { $set: { text } },
        );
        return updatedComment;
    }

    async deleteComment(id) {
        const deleteComment = await ArticleCommentsModel.findByIdAndDelete({
            _id: new ObjectId(id),
        });
        return deleteComment;
    }
}

module.exports = new ArticleCommentsService();
