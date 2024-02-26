const { Router } = require('express');
const ArticlesController = require('../controllers/articleController');
const ArticlesCommentsController = require('../controllers/articleCommentsController');
const ArticlesRatingController = require('../controllers/articleRatingController');

const articlesRouter = new Router();

articlesRouter.get('', ArticlesController.getAll);
articlesRouter.get('/:id', ArticlesController.getById);
articlesRouter.post('/comments/:id', ArticlesCommentsController.createComment);
articlesRouter.get('/comments/:id', ArticlesCommentsController.getById);
articlesRouter.delete('/comments/:id', ArticlesCommentsController.deleteComment);
articlesRouter.patch('/comments/:id', ArticlesCommentsController.updateComment);
articlesRouter.post('/rating/:id', ArticlesRatingController.addRating);

module.exports = articlesRouter;
