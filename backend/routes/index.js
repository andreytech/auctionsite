const {userRegister, userLogin} = require('./users.js');
const {auctionsList} = require('./auctions.js');
const router = require('express').Router();
const isAuth = require('../middlewares/is-auth');

router.post('/users/register', userRegister);
router.post('/users/login', userLogin);

router.get('/auctions', [isAuth, auctionsList]);

module.exports = router;