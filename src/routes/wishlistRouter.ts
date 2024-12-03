const {Router} = require('express');
const {createWishList, getWishList, deleteWishList, checkWishList} = require('../controllers/wishListController');
const wishListRouter = Router();

wishListRouter.post('/wishlist', createWishList);
wishListRouter.get('/wishlist/:userId', getWishList);
wishListRouter.delete('/wishlist/:id', deleteWishList);
wishListRouter.post('/wishlist/check', checkWishList);

export default wishListRouter;