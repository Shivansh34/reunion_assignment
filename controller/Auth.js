const User = require('../models/User');

exports.authenticate = async (req,res,next) =>{
    const {email,password} = req.body;
    if(!email||!password){
        next(new ErrorResponse("No credentials",400));
    }
    try{
        const user = await User.findOne({email}).select("+password");
        if(!user){
            next(new ErrorResponse("No user with the email",401));
        }
        else{
            const isMatch = await user.matchPassword(password);
            if(isMatch){
                sendToken(user,200,res);
            }
            else{
                next(new ErrorResponse("Wrong Password",401));
            }
        }
    }
    catch(error){
        next(error);
    }
};

const sendToken = async (user,statusCode,res) => {
    const token = await user.getSignedToken();
    res.status(statusCode).json({
        success:"true",
        token ,
        firstname :user.firstname,
        lastname: user.lastname,
        email:user.email,
    });
}