const router = require('express').Router();
const async = require('async');
const stripe = require('stripe')('sk_test_wkcPYTXmqh2Y1Qayai7cW1Bk');
const checkJWT = require('../middlewares/check-jwt');
 
module.exports = router;


