const mongoose=require('mongoose');
const Schema=mongoose.Schema

const ingridientSchema=Schema({
    items:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    unit:{
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

const ingridientsModel=mongoose.model('ingridient',ingridientSchema);
module.exports=ingridientsModel;