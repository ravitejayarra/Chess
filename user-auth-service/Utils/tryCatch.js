const trycatch = (handler)=>{

  return async(req,res,next)=>{
     
    try{
       await handler(req,res,next);
    }
    catch(ex){
        next(ex)
    }
  }

};


module.exports = trycatch;