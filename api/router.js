"use strict";

const express    = require('express');
const routes     = express.Router();
const authEngine = require('../authentication/auth');

let account      = require('./account/account.controller');

router.use(authEngine);
router.use('/account', account);

module.exports = routes;
