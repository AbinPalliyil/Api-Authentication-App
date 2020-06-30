const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passprtConf = require('../passport');

const UserControler = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/routerHelper');

router
	.route('/signup')
	.post(validateBody(schemas.authSchema), UserControler.signUp);

router.route('/signin').post(UserControler.signIn);

router.route('/secret')
	.get(passport.authenticate('jwt', {session: false}),UserControler.secret,);

module.exports = router;
