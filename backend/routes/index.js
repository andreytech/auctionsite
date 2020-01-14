const {userRegister, userLogin, getUser} = require('./users.js');
const {auctionsList, createAuction} = require('./auctions.js');
const router = require('express').Router();
const isAuth = require('../middlewares/is-auth');

router.post('/users/register', userRegister);
router.post('/users/login', userLogin);
router.get('/users/load', [isAuth, getUser]);

router.get('/auctions', auctionsList);
// router.post('/auctions', [isAuth, createAuction]);
router.post('/auctions', createAuction);

module.exports = router;