const express = require('express');
const { authChecker } = require('../midleware/AuthChecker');
const { handlePost, handleGetPosts, handleUpdatePost, handleDeletePost, handleLikePost } = require('../controllers/postController');
const postRouter = express.Router()

postRouter.post("/", authChecker, handlePost)
.get("/", handleGetPosts)
.put("/:id", authChecker, handleUpdatePost)
.delete("/:id", authChecker, handleDeletePost)
.post("/:id", authChecker,handleLikePost)

module.exports = postRouter;