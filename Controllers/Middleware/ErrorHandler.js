const {constants}= require("../../routes/Constants")
const errorHandler=(err,req,res,next )=>{
    const statusCode= res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR  :
            res.json({title:"Validation error",message:err.message , StackTrace : err.StackTrace}); 
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not Found",message:err.message , StackTrace : err.stackTrace}); 
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Not Authorized",message:err.message , StackTrace : err.stackTrace}); 
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidden",message:err.message , StackTrace : err.stackTrace}); 
            break;   
        case constants.SERVER_ERROR:
            res.json({title:"Server Error",message:err.message , StackTrace : err.stackTrace}); 
            break;  
    
        default:
            console.log("No error all good");
            break;
    }

}

module.exports={errorHandler}