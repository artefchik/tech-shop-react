const mongoose = require('mongoose');
const ArticleModel = require('../models/articleModel');
const ApiError = require('../exceptions/apiError');
const articleRatingService = require('./articleRatingService');
const UserService = require('./userService');
const ArticleDto = require('../dtos/articleDto');
const UserDto = require('../dtos/userDto');

class ArticleService {
    async getAll(query) {
        const limit = query.limit ?? 2;
        const page = query.page ?? 1;
        const order = query.order ?? 'asc';
        const sort = query.sort ?? 'views';
        let articles;
        if (!query.type) {
            articles = await ArticleModel.find()
                .skip(page * limit - limit)
                .limit(limit)
                .sort({ [sort]: order });
        } else {
            articles = await ArticleModel.find({
                types: { $elemMatch: { $eq: query.type } },
            })
                .skip(page * limit - limit)
                .limit(limit)
                .sort({ [sort]: order });
        }

        async function processArticlesWithUsers(articles) {
            const articlesWithUsers = [];

            for (const article of articles) {
                try {
                    const user = await UserService.getOne(article.userId);

                    const articleDto = new ArticleDto(article);

                    articlesWithUsers.push({ ...articleDto, user });
                } catch (error) {
                    console.error(`Error processing comment: ${error.message}`);
                }
            }

            return articlesWithUsers;
        }

        return processArticlesWithUsers(articles);
    }

    async getById(id) {
        const article = await ArticleModel.findById(id);
        if (!article) {
            return ApiError.BadRequest(`Статьи с таким ${id} не найдено`);
        }
        const user = await UserService.getOne(article.userId);
        const articleDto = new ArticleDto(article);
        return {
            ...articleDto,
            user,
        };
    }
}
module.exports = new ArticleService();
