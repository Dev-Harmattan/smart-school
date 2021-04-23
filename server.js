const express = require('express');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
require('dotenv').config();
const flash = require('connect-flash');
const cors = require('cors');


const userRoute = require('./routes/user');
const pageRoute =  require('./routes/pages');
const adminRoute = require('./routes/admin');

//express app
const app =  express();

//database connection
const DBUSER = process.env.DBUSER;
const DBPASSWORD = process.env.DBPASSWORD;
const dbUrl = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.bbitn.mongodb.net/smartSchoolDB?retryWrites=true&w=majority`;
mongoose.connect(
  dbUrl,
  {useNewUrlParser: true, useUnifiedTopology: true}, 
  function(err){
    if(err){
      console.log(console.log(chalk.red(err)))
    }else{
      console.log(chalk.green('Database connected succesfully.'))
    }
});

//view engine
app.set('view engine', 'ejs');
app.set('views', [path.join(process.cwd() +  '/views'), 
                  path.join(process.cwd() +  '/views/student'),
                  path.join(process.cwd() +  '/views/portal'),
                  path.join(process.cwd() +  '/views/dashboard')]);

//express static
app.use('/css', express.static(path.join(process.cwd() + '/assets/css')));
app.use('/css', express.static(path.join(process.cwd() + '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(process.cwd() +'/assets/js')));
app.use('/js', express.static(path.join(process.cwd() +'/node_modules/bootstrap/dist/js')));
app.use('/img', express.static(path.join(process.cwd() + '/assets/img')));
app.use('/upload', express.static(path.join(process.cwd() + '/assets/upload')));
app.use('/jQuery', express.static(path.join(process.cwd() + '/node_modules/jquery')))





//passport authentication middleware
app.use(cookieParser( "Keyboard cat"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 30 * 24 * 60 * 60 * 1000},
  store: new MongoStore({
    mongoUrl: `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.bbitn.mongodb.net/smartSchoolDB?retryWrites=true&w=majority`,
    ttl: 24 * 60 * 60 // Keeps session open for 1 day
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors())


//pasport config
let User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//router middleware
app.use('/user', userRoute);
app.use('/', pageRoute);
app.use('/admin', adminRoute);

//catch error 404
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if(app.get('env') === 'development'){
  app.use(function(err, req, res, next){
    res.render('NotFound')
    // res.status(err.status || 500).json({
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
  res.render('NotFound',{status: err.status, title: 'notFound'})
  // res.status(err.status || 500).json({
  //   message: err.message,
  //   error: err
  // });
});


const PORT = process.env.PORT;
app.listen(PORT || 3000, ()=>{
  console.log(chalk.green(`Server running on http://localhost:${PORT}`));
});