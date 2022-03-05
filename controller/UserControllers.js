const { default: mongoose } = require('mongoose');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');


exports.getuser= async(req,res,next)=>{
    try {
        res.status(200).json({
            success: true,
            user: {
                username: req.user.username,
                followersSize: req.user.followers.length,
                followingSize: req.user.following.length
            }
            id: req.user._id,
        })
    } catch (error) {
        next(error);
    }
}

exports.follow = async(req,res,next) =>{
    try{
        const userToBeFollowed = await User.findById(req.params.id);
        const user = await User.findById(req.user._id);
        if(await user.following.includes(req.user._id)){
            res.status(201).json({
                success:true,
                data:"already following the user",
            });
            next();
        }
        else{
            userToBeFollowed.followers.push(req.user._id);
            user.following.push(req.params.id);
            await user.save();
            await userToBeFollowed.save();
            res.status(201).json({
                success:true,
                data:"followed the user",
            });
        }
    }
    catch(error){
        console.log(error);
        next(error);
    }
}

exports.unfollow = async(req,res,next) =>{
    try{
        const userToBeFollowed = await User.findById(req.params.id);
        const user = await User.findById(req.user._id);
        if(await user.following.includes(req.params.id)){
            userToBeFollowed.followers.pull(req.user._id);
            user.following.pull(req.params.id);
            await user.save();
            await userToBeFollowed.save();
            res.status(201).json({
                success:true,
                data:"unfollowed the user",
            });
        }
        else{
            res.status(201).json({
                success:true,
                data:"you do not follow the user",
            });
        }
    }
    catch(error){
        next(error);
    }
}