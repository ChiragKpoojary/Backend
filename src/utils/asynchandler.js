// const asynchandler =(requesthandler)=>{
// (req,res,next)=>{
// Promise.resolve(requesthandler(req,res,next)).
// catch(err=>next(err))
// }
// }




const asynchandler =(fun) =>async(req,res,next)=>{
try {
    await fun(req,res,next);
    
} catch (error) {
    res.status(error.status||500).json({message: error.message,sucess:false})
}
}



export default asynchandler;