const mongoose=require('mongoose');
const Schema=mongoose.Schema

const recipeSchema=Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    creator_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},
{timestamps:true}
);

const recipeModel=mongoose.model('recipe',recipeSchema);
module.exports=recipeModel;