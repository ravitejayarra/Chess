const auth = require('../controller/auth')
const express = require('express');
const router = express.Router();
const trycatch = require('../Utils/tryCatch')


router.post('/register', trycatch(auth.registerUser));

router.post('/login', trycatch(auth.loginUser));

module.exports = router;
