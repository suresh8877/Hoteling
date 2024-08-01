const jwt=require("jsonwebtoken");
const errorfunc=require("./error.js");

const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_name;
    if(!token) return next(errorfunc(400,"NO TOKEN"));
    
    jwt.verify(token, 'shhhhh', (err,user)=>{
        if(err) return next(errorfunc(400,"INVALID TOKEN"));
        req.user=user;
        next();
    });
}
const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id==req.params.id || req.user.isadmin){
            next();
        }
        else{
            next(errorfunc(401,"Not a USER"))
        }
    });
}
const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isadmin){
            next();
        }
        else{
            next(errorfunc(401,"Not a ADMIN"))
        }
    });
}

module.exports={
    verifyToken,
    verifyUser,
    verifyAdmin
}