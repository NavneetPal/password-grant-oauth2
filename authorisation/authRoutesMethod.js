const User=require('../models')['User'];
module.exports={
    registerUser:async(req,res)=>{
        const {username,password}=req.body;
        console.log(req.body);
        const user=await User.findOne({where:{username:username}});
        if(!user){
            const registeredUser=await User.create(req.body);
            if(registeredUser){
                res.status(200).json({
                    message:"Registration was successfull"
                })
            }
        }else{
            res.status(404).json({
                message:"User already Exist"
            });
        }
    },
    login:(req,res)=>{

    }
}