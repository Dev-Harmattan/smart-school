const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const studentSchema =  new Schema({
  user:{type: Schema.Types.ObjectId, ref: 'User'},
  lastName:{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  firstName:{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  middleName:{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  gender:{
    type: String,
    required: true,
    lowercase: true
  },
  birthDate:{
    type: Date,
    required: true,
    trim: true,
  },
  stateOfOrigin:{
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  residentAddress:{
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  parentOccupation:{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  state:{
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  formalSchoolName:{
    type:String,
    trim: true,
    lowercase: true,
  },
  reason:{
    type: String,
    trim: true,
    lowercase: true,
  },   
  formerClass:{
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  reciept: String
  
},
{timestamps: true}  
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;