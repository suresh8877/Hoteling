const errorfunc=(status,msg)=>{
    const err=new Error();
    err.message=msg;
    err.status=status;
    return err; 
}
module.exports=errorfunc;