const mongoose =require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const userSchema = new  Schema({
  email:{
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true
  },
  password:{
    type: String,
    trim: true,
    minLength: 6
  },
  role:{
    type: String,
    enum: ["admin", "user"],
    default: 'user'
  }},
  {timestamps: true}
  );

userSchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`;
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
module.exports = User;
