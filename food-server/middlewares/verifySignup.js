const userModel=require('../models/user');

exports.verifySignup=(req,res,next)=>{
    userModel.findOne({
        user_id:req.body.user_id
    }).exec((err,user_id)=>{
        if(err){
            console.log(err);
            return res.status(404).json({
                message:'Cannot find user_id'
            })
        }
        if(user_id){
            return res.status(404).json({
                message:'user_id already exists'
            })
        }
        const password=req.body.password;
        const confirm=req.body.confirmPassword;
        if(password!==confirm){
            return res.status(404).json({
                message:'Password mismatch'
            })
        }
        next();
    })
}