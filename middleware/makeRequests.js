const axios = require("axios").default;
const fetch = require("node-fetch");
const News = require('../models/news');
const Result =  require('../models/result');

exports.getMessages = (req, res, next) => {

  News.find({}).exec((err, datas) => {
    if(err){
      console.error(err);
      next();
    }else{
      req.messages = datas
      next();
    }
  })
}



exports.getResult = (req, res, next) => {
  const userId = req.session.user.user._id;
  Result.findOne({user: userId}).exec((err, result) => {
    if(err){
      console.log(err);
      next();
    }else{
        req.result = result.resultDetails;
      next();
    }
  })
}

exports.getResults = (req, res, next) => {
  Result.findOne({}).exec((err, result) => {
    if(err){
      console.log(err);
      next();
    }else{
      req.results = result.resultDetails;
      next();
    }

  })
}