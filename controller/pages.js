const { json } = require('body-parser');
// const { request } = require('express');
const https =  require('https');
const { replace } = require('lodash');
const _ = require('lodash');
const nodemailer = require('nodemailer');

exports.home = (req, res) => {
  res.render('home', {title: 'Home', subscribedMessage: '', auth: req.session.user});
}

exports.postHome = (req, res) => {
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed'
      }
    ]
  }
  const postData = JSON.stringify(data);

  const url = `https://us4.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMPLISTKEY}`;
  const options = {
    method: 'POST',
    auth: `sodiq1:${process.env.MAILCHIMPKEY}`
  }

  const request = https.request(url, options, (response) => {
    console.log('Status code: ', response.statusCode);
    console.log('Response message: ', response.statusMessage);

    if(response.statusCode === 200){
      req.flash('Success', 'You have subscribed sucessfully.')
      res.render('home', {title: 'Home', auth: req.session.user, subscribedMessage: req.flash('Success')});
    }else{
      req.flash('failure', 'Error..! Try again.');
      res.render('home', {title: 'Home', auth: req.session.user, subscribedMessage: req.flash('failure')});
    }


    response.on('data', (data) => {
      console.log(JSON.parse(data));
    })
  })


  request.write(postData);
  request.end();

}

exports.about = (req, res) => {
  res.render('about', {title: 'About us', auth: req.session.user});
}

exports.admission = (req, res) => {
  res.render('admission', {title: 'Admission', auth: req.session.user});
}

exports.boarding = (req, res) => {
  res.render('boarding', {title: 'Boarding', auth: req.session.user});
}

exports.curriculum = (req, res) => {
  const curriculumType =  req.params.curriculumType;
  var title = "";

  if(curriculumType == 'early_years'){
    title = _.capitalize(_.replace(curriculumType, 'early_years', 'Early years'));
  }else{
    title = _.capitalize(curriculumType);
  }
  res.render('curriculum', {title: title, auth: req.session.user});
}

exports.getContact = (req, res) => {
  res.render('contact', {title: 'Contact', auth: req.session.user});
}

exports.postContact = (req, res) => {

  let output = `
    <h3>Customer contact</h3>
    <ul>
      <li>from: ${req.body.email}</li>
      <li>Sender name: ${req.body.name}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message:</h3>
    <p>${req.body.message}</p>
  `


  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
      user: 'ganiyusodiq059@gmail.com',
      pass: `${process.env.GMAILPASSWORD}`
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: `${req.body.email}`,
    to: 'ganiyusodiq794@gmail.com',
    subject: 'Parent Contact',
    text: 'Hello Smart School',
    html: output
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if(err){
      return console.log(err);
    }

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  })


}