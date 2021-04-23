const express = require('express');
const router =  express.Router();
const {home, postHome, about, admission, boarding, curriculum, getContact, postContact} = require('../controller/pages');

router.route('/').get(home).post(postHome);

router.get('/about', about);

router.get('/admission', admission);

router.get('/boarding', boarding);

router.get('/curriculum/:curriculumType', curriculum);

router.route('/contact').get(getContact).post(postContact);


module.exports =  router;