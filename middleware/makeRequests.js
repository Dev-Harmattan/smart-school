const axios = require("axios").default;

exports.getMessages = (req, res, next) => {
  let messages = [];
  axios(`/admin/dashboard/message`)
    .then((response) => {
      req.messages = response.data.message;
      next();
    })
    .catch((err) => {
      req.messages = [];
      next()
    });
}



exports.getResult = (req, res, next) => {
  const userId = req.session.user.user._id;
  axios(`/admin/dashboard/result/${userId}`)
    .then((response) => {
      req.result = response.data.data;
      next();
    })
    .catch((err) => {
      req.result = [];
      next();
    });     
}

exports.getResults = (req, res, next) => {
  axios(`/admin/dashboard/result`)
    .then((response) => {
      req.results = response.data.data;
      next();
    })
    .catch((err) => {
      req.results = [];
      next();
    });
}