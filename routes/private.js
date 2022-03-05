const express = require('express');
const { post, deletePostbyId, comment, likebyId, unlikebyId, getAllPosts, getPostbyId } = require('../controller/postControllers');
const router = express.Router();
const {follow, unfollow, getuser} = require('../controller/UserControllers');
const {protect} = require('../middleware/auth');

router.post('/follow/:id',protect,follow);
router.post('/unfollow/:id',protect,unfollow);
router.get('/user',protect,getuser);
router.post('/posts',protect,post);
router.get('/posts/:id',protect,getPostbyId);
router.delete('/posts/:id',protect,deletePostbyId);
router.post('/comment/:id',protect,comment);
router.post('/like/:id',protect,likebyId);
router.post('/unlike/:id',protect,unlikebyId);
router.get('/all_posts',protect,getAllPosts);


module.exports= router;
