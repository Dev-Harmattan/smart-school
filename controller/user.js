const { request } = require("express");
const passport = require("passport");
const User = require("../models/user");
const Student = require("../models/student");
const axios = require("axios").default;
const fetch = require("node-fetch");

exports.userRegister = (req, res) => {
  res.render("userRegister", {
    title: "Register",
    error: "",
    user: "",
    auth: req.session.user,
  });
};

exports.createUser = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  if (req.validationError) {
    return res.render("userRegister", {
      title: "Register",
      error: req.validationError,
      user: user,
    });
  } else {
    User.register(
      { username: user.email, email: user.email },
      req.body.password,
      function (err, user) {
        if (err) {
          // res.status(400).json({error: err.message});
          return res.render("userRegister", {
            title: "Register",
            error: err.message,
            auth: req.session.user,
            user: user,
          });
        } else {
          req.session.user = { user: user, auth: req.isAuthenticated() };
          if (user.role === "user") {
            res.redirect("/user/student/welcome");
          }
          if (user.role === "admin") {
            res.redirect("/user/admin/dashboard");
          }
        }
      }
    );
  }
};

exports.createLogin = (req, res, next) => {
  const userInput = {
    username: req.body.username,
    password: req.body.password,
  };

  if (req.validationError) {
    return res.render("login", {
      title: "Login",
      message: "",
      auth: req.session.user,
      error: req.validationError,
      user: userInput,
      flashMessage: "",
    });
  } else {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render("login", {
          title: "Login",
          message: info.message,
          error: "",
          auth: req.session.user,
          user: userInput,
          flashMessage: "",
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        req.session.user = { user: user, auth: req.isAuthenticated() };
        if (user.role === "user") {
          res.redirect("/user/student/welcome");
        }
        if (user.role === "admin") {
          res.redirect("/user/admin/dashboard");
        }
      });
    })(req, res, next);
  }
};

exports.userLogin = (req, res, next) => {
  res.render("login", {
    title: "Login",
    message: "",
    error: "",
    user: "",
    auth: "",
    flashMessage: req.flash("info"),
  });
};

exports.userLogout = (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  req.logout();
  res.redirect("/");
};

exports.getHomepage = (req, res) => {
  return res.render("welcome", { auth: req.session.user });
};

exports.studentRegister = (req, res) => {
  res.render("studentRegister", { auth: req.session.use });
};

exports.createStudentRegister = (req, res) => {
  const email = req.session.user.user.email;

  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      const {
        lastName,
        firstName,
        middleName,
        gender,
        birthDate,
        parentOccupation,
        stateOfOrigin,
        residentAddress,
        state,
        formalSchoolName,
        formerClass,
        reason,
      } = req.body;

      let studentData = {
        user: user._id,
        lastName,
        firstName,
        middleName,
        gender,
        birthDate,
        parentOccupation,
        stateOfOrigin,
        residentAddress,
        state,
        formalSchoolName,
        formerClass,
        reason,
      };

      if (req.file) {
        studentData.reciept = req.file.filename;
      }

      const student = new Student(studentData);

      student.save(function (err, user) {
        if (err) {
          return res.status(400).json({ message: err });
        }
        return res.redirect("/user/student/dashboard");
      });
    }
  });
};

exports.studentDashboard = (req, res) => {
  return res.render("dashboard", {
    title: "dashboard home",
    auth: req.session.user,
    userDetails: "",
    result: "",
  });
};

exports.adminDashboard = (req, res) => {
  return res.render("dashboard", {
    title: "dashboard home",
    auth: req.session.user,
    userDetails: "",
    result: "",
  });
};

exports.adminUser = (req, res) => {
  Student.findOne({ user: req.session.user.user._id })
    .populate("user", { role: 1, email: 1 })
    .exec((err, user) => {
      if (err) {
        console.log(err);
      } else {
        return res.render("dashboard", {
          title: "user",
          auth: req.session.user,
          userDetails: user,
          result: req.result,
          status: '',
          message: req.messages
        });
      }
    });
};

exports.userSetting = ( req, res ) => {
  return res.render("dashboard", {
    title: "userSetting",
    auth: req.session.user,
    userDetails: '',
    result: req.results,
    status: '',
    message:''
  });
  

}
