const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlist.controller.js');
const { authenticate } = require('../middleware/authenticate.js'); 

router.get('/', authenticate, wishlistController.getWishlist);
router.post('/toggle', authenticate, wishlistController.toggleWishlistItem);
router.delete('/:productId', authenticate, wishlistController.removeWishlistItem);

module.exports = router;

module.exports = router;