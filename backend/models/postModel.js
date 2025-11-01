const mongoose = require("mongoose")

const  postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String},
    image: {type: String},
    review: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        comment: {type: String},
        like: {type: Number},
    }],
    totalLikes: {type: Number, default: 0},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } ,
    createdAt : {type: Date, default: Date.now()}
})
const Post = mongoose.model('Post', postSchema)
module.exports = Post;