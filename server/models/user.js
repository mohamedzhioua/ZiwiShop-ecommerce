const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim: true ,

    },
    password:{
        type:String,
        required:true,

    },
  
}, {timestamps: true})




module.exports = mongoose.model('user', UserSchema)