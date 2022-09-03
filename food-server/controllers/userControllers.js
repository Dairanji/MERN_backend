const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const path=require('path');

const userModel=require('../models/user');
const recipeModel=require('../models/recipe');
const ingridientsModel=require('../models/ingridients');
const processModel=require('../models/process');


exports.signup=(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'Welcome to user signup.'
    })
}

exports.addSignup=(req,res)=>{
    userModel({
        name:req.body.name,
        user_id:req.body.user_id,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    }).save((err,user)=>{
        if(!err){
            res.status(200).json({
                status:'success',
                result:user,
                message:'user registered successfully'
            })
        }else{
            res.status(404).json({
                result:err,
                message:'register unsuccessful.'
            })
        }
    })
}

exports.login=(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'Welcome to user login.'
    })
}

exports.addLogin=async(req,res,next)=>{
    userModel.findOne({
        user_id:req.body.user_id
    },(err,data)=>{
        if(data){
            const hashpwd=data.password;
            if(bcrypt.compareSync(req.body.password,hashpwd)){
                const token=jwt.sign({
                    name:data.name,
                    user_id:data.user_id
                },'shayantan@ajgfask3339837',{expiresIn:'5s'});
                res.cookie('userToken',token);
                console.log(token);
                res.status(200).json({
                    status:'successful',
                    message:'login successful'
                })
            }else{
                res.status(404).json({
                    result:err,
                    message:'Wrong Password'
                })
            }
        }else{
            res.status(404).json({
                result:err,
                message:'Invalid user_id'
            })
        }
    })
}

exports.logout=(req,res)=>{
    res.clearCookie('userToken');
    res.status(200).json({
        status:'success',
        message:'Logout successful.'
    })
}

exports.userAuth=(req,res,next)=>{
    if(req.user){
        console.log(req.user);
        next();
    }else{
        console.log(req.user,'err');
        req.redirect('/login')
        res.status(404).json({
            status:'error',
            result:req.user
        })
    }
}


exports.addRecipe=(req,res)=>{
    const image=req.file
    const recipes=new recipeModel({
        name:req.body.name,
        description:req.body.description,
        image:image.path,
        creator_id:req.body.creator_id
    })
    recipes.save().then((result)=>{
        res.status(201).json({
            status:'success',
            result:result,
            message:'data added'
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'failed',
            result:err,
            message:'data add failed'
        })
    })
}

// exports.showRecipe=(req,res)=>{
//     recipeModel.find((err,data)=>{
//         if(!err){
//             res.status(200).json({
//                 status:'success',
//                 result:data,
//                 message:'data fetched...'
//             })
//         }else{
//             res.status(404).json({
//                 status:'failed',
//                 result:err,
//                 message:'something went wrong...'
//             })
//         }
//     })
// }

exports.showRecipe=(req,res)=>{
    recipeModel.find().populate("creator_id").exec((err,data)=>{
        if(!err){
            console.log(data);
            res.status(200).json(data)
        }else{
            console.log(err);
            res.status(404).json(err)
        }
    })
}

exports.addIngridients=async(req,res)=>{
    const ingridients=new ingridientsModel(req.body);

    try{
        const savedIngridients=await ingridients.save();
        res.status(200).json(savedIngridients)
    }catch(err){
        res.status(404).json(err)
    }
}

exports.addProcess=async(req,res)=>{
    const process=new processModel(req.body);

    try{
        const savedProcess=await process.save();
        res.status(200).json(savedProcess)
    }catch(err){
        res.status(404).json(err)
    }
}

exports.showProcess=(req,res)=>{
    processModel.find((err,data)=>{
        if(!err){
            res.status(200).json({
                status:'success',
                result:data,
                message:'data fetched...'
            })
        }else{
            res.status(404).json({
                status:'failed',
                result:err,
                message:'something went wrong...'
            })
        }
    })
}

