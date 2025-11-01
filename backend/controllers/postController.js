const Post = require("../models/postModel");

const handlePost =async(req, res)=>{
    const {title, text, image} = req.body;
    try{
        if(!title || !text && !image){
            return res.status(404).json({
                error: "All input required"
            })
        }
        const newPost = await Post.create({
            title, text, image, user:req.user.userId
        })
        return res.json({
            message: "Posted",
            post: newPost
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
const handleGetPosts = async(req, res)=>{
    try{
        const posts = await Post.find().sort({createdAt: -1}).populate('user review.userId' , "email username")
        return res.json({
            posts: posts
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
const handleUpdatePost = async(req, res)=>{
    const {id} = req.params;
    const {title, text, image} = req.body;
    try{
        const post = await Post.findByIdAndUpdate(id, {title, text, image}, {new: true});
        return res.json({
            message: "Post updated",
            post: post
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
const handleDeletePost = async(req, res)=>{
    const {id} = req.params;
    try{
        const post = await Post.findByIdAndDelete(id);
        return res.json({       
            message: "Post deleted",
            post: post
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
const handleLikePost = async(req, res)=>{
    const {id} = req.params;
    const {like, comment} = req.body;
    try{
        const post = await Post.findOne({_id:id});
        if(!post){
            return res.status(404).json({
                error: "Post not found"
            })
        }
        post.review.push({like, comment, userId:req.user.userId})
        post.totalLikes = post.totalLikes + 1
        post.save()
        return res.json({
            message: "Liked",
            post: post
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}

module.exports = {
    handlePost,
    handleGetPosts,
    handleUpdatePost,
    handleDeletePost,
    handleLikePost
}


