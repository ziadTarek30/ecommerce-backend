
module.exports = (err,req,res,next)=>{
err.statusCode = err.statusCode || 500;
err.status = err.status || 'error';




if(process.env.ENV === 'development'){
    return res.status(err.statusCode).json({
        status:err.status,
        erorr:err,
        message:err.message,
        stack:err.stack
    })
}
res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
    })

}