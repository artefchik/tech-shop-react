const { Router } = require('express');
const ArticlesController = require('../controllers/articleController');
const ArticlesCommentsController = require('../controllers/articleCommentsController');

const articlesRouter = new Router();

articlesRouter.get('/articles', ArticlesController.getAll);
articlesRouter.get('/articles/:id', ArticlesController.getById);
articlesRouter.post('/articles/comments/:id', ArticlesCommentsController.createComment);
articlesRouter.get('/articles/comments/:id', ArticlesCommentsController.getById);
articlesRouter.delete('/articles/comments/:id', ArticlesCommentsController.deleteComment);
articlesRouter.patch('/articles/comments/:id', ArticlesCommentsController.updateComment);

module.exports = articlesRouter;
