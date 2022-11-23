const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { 
        type:String, 
        required: true 
    },
    email:{
        type:String,
        required:true,
        unique:true,
  
    },
    password:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        default:"https://avatars.githubusercontent.com/u/107249637?v=4"
    }
  
}, {timestamps: true})




module.exports = mongoose.model('user', UserSchema)