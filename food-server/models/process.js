const mongoose=require('mongoose');
const Schema=mongoose.Schema

const processSchema=Schema({
    step:{
        type:String,
        required:true
    },
    recipe_id:{
        type:Schema.Types.ObjectId,
        ref:'recipe'
    }
},
{timestamps:true}
);

const processModel=mongoose.model('process',processSchema);
module.exports=processModel;