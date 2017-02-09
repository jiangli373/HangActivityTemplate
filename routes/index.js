'use strict';
const express = require('express');
const router = express.Router();

const Activity = require('../controller/Activity');
const Sign = require('../controller/Sign');
const Auth = require('../middlewares/Auth');

const STATICURL = 'focusus.html';

router.get('/', function (req, res, next) {
  return res.redirect(STATICURL);
});

router.get('/cacheIndex',Activity.cacheIndex);
router.get('/personal',Auth.userRequired,Activity.personal);

router.get('/share',Auth.checkWeixinBroswer,Activity.share);
router.post('/doHelp',Auth.userRequiredTwo,Activity.doHelp);

router.get('/doCheck', Sign.sign);

module.exports = router;
