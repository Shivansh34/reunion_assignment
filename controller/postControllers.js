const Post = require('../models/Post');
const User = require('../models/User');

exports.post = async (req, res, next) => {
  try {
    const {title,description}= req.body;
    const user = await User.findById(req.user._id);
    let post= await Post.create({
      creater: req.user._id,
      title: title,
      description: description,
    });
    user.post.push(post._id);
    await user.save();
    res.status(201).json({
      title: title,
      description: description,
      "post-id":post._id
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostbyId = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      title: post.title,
      description: post.description,
      likes: post.likedby.length,
      comments : post.comments,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePostbyId = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);
    if(post.creater.toString()===req.user._id.toString()){
      await Post.findByIdAndDelete(req.params.id);
      user.post.pull(req.params.id);
      await user.save();
      res.status(201).json({message:"successfully deleted"});
    }
    else{
      res.status(403).json({
        message:"do not have permission"
      })
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.comment = async (req, res, next) => {
  try {
    const {comment}= req.body;
    const post = await Post.findById(req.params.id);
    var comments= post.comments.create({
      comment: comment,
    });
    post.comments.push(comments);
    await post.save();
    res.status(201).json({
      comment: comment,
      "comment-id": comments._id
    });
  } catch (error) {
    next(error);
  }
};

exports.likebyId = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);
    post.likedby.push(user._id);
    await post.save();
    res.status(200).json({message:"liked the post"});
  } catch (error) {
    next(error);
  }
};

exports.unlikebyId = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);
    post.likedby.pull(req.params._id);
    await post.save();
    res.status(200).json({message:"unliked the post"});
  } catch (error) {
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    let posts = new Array();
    const user = await User.findById(req.user._id);
    for(let i=0;i<user.post.length;i++){
      let post=await Post.findById(user.post[i]);
      posts.push(post);
    }
    res.status(200).json({
      posts: posts
    })
  } catch (error) {
    next(error);
  }
};