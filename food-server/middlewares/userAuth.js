const jwt=require('jsonwebtoken');

exports.authJwt=(req,res,next)=>{
    if(req.cookies && req.cookies.userToken){
        jwt.verify(req.cookies.userToken,'shayantan@ajgfask3339837',(err,data)=>{
            req.user=data
            next();
        })
    }else{
        next();
    }
}