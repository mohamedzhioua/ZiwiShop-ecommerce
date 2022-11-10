const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   
    Email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true ,

    },
    Password:{
        type:String,
        required:true,

    }
  
}, {timestamps: true})




module.exports = mongoose.model('users', UserSchema)