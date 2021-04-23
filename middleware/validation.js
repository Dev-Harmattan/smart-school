const {check, validationResult} = require('express-validator');
const { userLogin } = require('../controller/user');

exports.validateUserRegister = [
  check("email").isEmail().withMessage("valid email is required"),
  check("password").isLength({min: 6}).withMessage("Password must be atleast 6 characters")
];

exports.validateUserLogin = [
  check("username").isEmail().withMessage("Valid email is required"),
  check("password").isLength({min: 6}).withMessage("Password must be atleast 6 characters")
]
        

exports.validateStudentRegister = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("middleName").notEmpty().withMessage("Middle name is require"),
  check("gender").notEmpty().withMessage("gender"),
  check("birthDate").notEmpty().withMessage("birthDate"),
  check("parentOccupation").notEmpty().withMessage("Parent Occupation is required"),
  check("stateOfOrigin").notEmpty().withMessage("State of origin is required"),
  check('residentAddress').notEmpty().withMessage("Resident address is required"),
  check("state").notEmpty().withMessage("State is required"),
  check("formalSchoolName").notEmpty().withMessage("Formal school name is required"),
  check("formerClass").notEmpty().withMessage("Formal class name is required"),
  check("reason").notEmpty().withMessage("Reason is required")
]

exports.isUserRequestValidate = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    req.validationError =  errors.errors;
  }
  next();
}


exports.ensureAuthenticated = (req, res, next) => {
  // req.session.user = {user: { name: 'sodiq', password: '123456789' }, auth: true};
  // next();
  const auth = req.session.user.auth;
  console.log(auth);
  if(!auth){
    req.flash('info', 'Login to proceed.');
    return res.redirect('/user/login');
  }else{
    next();
  }
}

