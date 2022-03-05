const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const productSchema = require('./Post');

const sano =10;

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    following: [mongoose.Schema.Types.ObjectId],
    followers: [mongoose.Schema.Types.ObjectId],
    post: [mongoose.Schema.Types.ObjectId],
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.getSignedToken = async function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{});
}

const User = mongoose.model("User", userSchema);

module.exports = User;