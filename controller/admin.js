const News = require('../models/news');
const Result =  require('../models/result');


exports.getMessage = (req, res) => {
  News.find({}).exec((err, datas) => {
    if(err){
      console.error(err);
    }else{
      return res.status(200).json({message: datas});
    }
  })
}


exports.postMessage = (req, res) => {
  const {name, message} = req.body;
  const newsInput= {
    name,
    message,
  }

  const news =  new News(newsInput);
  news.save((err, data) => {
    if(err){
      console.error(err);
    } else {
      return res.status(200).json({message: data});
    }
  })
}

exports.getAllResults = (req, res) => {
  Result.find({}).exec((err, datas) => {
    if(err){
      console.error(err);
    }else{
      return res.status(200).json({data: datas});
    }
  })
}

exports.getResult = (req, res) => {
  Result.find({user: req.params.userId}).exec((err, result) => {
    if(err){
      return res.status(400).json({message: err});
    }else{
      return res.status(200).json({data: result[0].resultDetails});
    }
  })
}

exports.postResult = (req, res) => {
  const {
    user,
    code,
    subject,
    grade,
    score,
    over,
    date
  } = req.body;

  Result.findOne({user: user}).exec((err, result) => {
    if(err){
      console.log(err);
      return;
    }
    if(result){
      Result.updateOne(
        {user: user}, 
        {$push: {resultDetails: {code, subject, grade, score, over, date}
      }}).exec((err, result) => {
        if(err){
          console.log(err);
          return;
        }else{
          req.flash('Success', 'Result Sucessfully Added.');
          return res.render("dashboard", {
            title: "userSetting",
            auth: '',
            userDetails: "",
            result: '',
            status: req.flash('Success'),
            message: ''
          });
        }
      })
    }else{
      const resultInput = {
        user: user,
        resultDetails: [
          {
            code,
            subject,
            grade,
            score,
            over,
            date
          }
        ]
      }
    
      const result = new Result(resultInput);
      result.save((err, result) => {
        if(err){
          req.flash('Failed', 'Failed to Add Result.')
          return res.render("dashboard", {
            title: "userSetting",
            auth: '',
            userDetails: "",
            result: req.flash('Failed'),
          });
        }else{
          req.flash('Success', 'Result Sucessfully Added.')
          return res.render("dashboard", {
            title: "userSetting",
            auth: '',
            userDetails: "",
            result: req.flash('Success'),
          });
        }
      });
    }
  })
  
}

exports.updateResult = (req, res) => {

  const {
    code,
    subject,
    grade,
    score,
    over,
    date
  } = req.body;

  Result.findOneAndUpdate(
    {
      user: req.params.userId,
      'resultDetails._id': req.params.courseId
    },
    {$set: {
      'resultDetails.$.code': code,
      'resultDetails.$.subject': subject,
      'resultDetails.$.grade': grade,
      'resultDetails.$.score': score
    }}).exec((err, result) => {
      if(err){
        console.error(err);
      }else{
        res.status(200).json({updateResult: result})
      }
    })
} 


exports.deleteResult = (req, res) => {
  Result.updateOne(
    {
      user: req.params.userId, 
    },
    {
      $pull: {'resultDetails': {_id: req.params.courseId}}
    },
    {save: true, multi: true}
  ).exec((err, result) => {
    if(err){
      console.error(err);
    }else{
      res.status(200).json({message : result})
    }
  })
}

