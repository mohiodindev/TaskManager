
const {CustomError} = require('../Errors/custom-error')
const errorHandller = (err,req,res,next)=>{
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:'Somthing goes wrong try again...'})
    
    
}
module.exports=errorHandller;