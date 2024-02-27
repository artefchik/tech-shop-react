const { Router } = require('express');
const { body } = require('express-validator');
const ProfileController = require('../controllers/profileController');

const router = new Router();

router.get('/:id', ProfileController.getById);
router.patch('/:id', ProfileController.updateProfile);

module.exports = router;
