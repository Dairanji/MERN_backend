const mongoose=require('mongoose');
const Schema=mongoose.Schema

const userSchema=Schema({
    name:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},
{timestamps:true}
);

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;