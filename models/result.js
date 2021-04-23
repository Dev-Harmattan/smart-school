const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  resultDetails: [
    {
      code: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      subject: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },
      grade: {
        type: Number,
        required: true
      },
      score:{
        type: Number,
        required: true
      },
      over: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: () => Date.now() + 7*24*60*60*1000
      }
    },
  ]
},
{timestamps: true}  
);


const Result =  mongoose.model('Result', resultSchema);
module.exports =  Result;