const { Router } = require('express');
const BasketSController = require('../controllers/basketController');

const router = new Router();

router.post('/:id', BasketSController.addProduct);
router.get('/:id', BasketSController.getProducts);
router.patch('/:id', BasketSController.updateProduct);
router.delete('/:id', BasketSController.deleteProduct);

module.exports = router;
