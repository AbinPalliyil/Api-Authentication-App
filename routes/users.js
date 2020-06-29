const express = require('express');
const router = require('express-promise-router')();

const UserControler = require('../controllers/users');

router.route('/signup').post(UserControler.signUp);

router.route('/signin').post(UserControler.signIn);

router.route('/secret').get(UserControler.secret);

module.exports = router;
