const express = require('express');
const passport =  require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const multer = require('multer');
const path = require('path');
const shortid =  require('shortid');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), '/assets/upload'))
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});

var upload = multer({storage: storage})

const { createUser, userRegister, 
        userLogin, createLogin , 
        getHomepage, userLogout, 
        studentRegister, createStudentRegister,
        studentDashboard,
        adminDashboard,
        adminUser,
        userSetting
     } = require('../controller/user');
const { validateUserRegister, isUserRequestValidate, validateUserLogin,
    validateStudentRegister} = require('../middleware/validation');
const {getMessages, getResult, getResults} = require('../middleware/makeRequests');

const router = express.Router();

router.route('/register').get(userRegister)
    .post(validateUserRegister, isUserRequestValidate, createUser);

router.route('/login').get(userLogin)
    .post(validateUserLogin, isUserRequestValidate, createLogin);

router.get('/student/welcome', ensureLoggedIn('/user/login'), getHomepage);

router.get('/logout', userLogout);

router.route('/student/register').get(ensureLoggedIn('/user/login'), studentRegister)
    .post(validateStudentRegister,  isUserRequestValidate, upload.single('reciept'),  createStudentRegister);

router.get('/student/dashboard', ensureLoggedIn('/user/login'), studentDashboard);

router.get('/admin/dashboard', ensureLoggedIn('/user/login'), adminDashboard);

router.get('/student/dashboard/profile', ensureLoggedIn('/user/login'), getMessages, getResult, adminUser);

router.route('/student/dashboard/setting')
    .get(getResults, userSetting)
    .post();

    
module.exports = router;
