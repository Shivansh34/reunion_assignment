const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
  comment: {
    type: String,
    required: true,
  }
});

const postSchema = mongoose.Schema({
  creater:mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likedby:[mongoose.Schema.Types.ObjectId],
  comments:[commentSchema],
},
{
  timestamps: true
});


const Post = mongoose.model("Post", postSchema);
module.exports = Post;
