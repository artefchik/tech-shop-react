const { Router } = require('express');
const { body } = require('express-validator');
const UserController = require('../controllers/userController');

const userRouter = new Router();

userRouter.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 4, max: 32 }),
    UserController.registration,
);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.get('/refresh', UserController.refresh);

module.exports = userRouter;
