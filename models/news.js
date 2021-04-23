const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newsSchema = Schema({
  name: {
    type: String,
    required: String,
    trim: true,
    lowercase: true
  },
  date: {
    type: Date,
    default: () => Date.now() + 7*24*60*60*1000
  },
  message: {
    type: String,
    required: true,
    lowercase: true
  }
},
{timestamps: true}
);


const News =  mongoose.model('News', newsSchema);
module.exports = News;