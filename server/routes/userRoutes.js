import express from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import {
    createPost,
    editPost,
    deletePost,
    getPosts,
    loggedUserPosts,
    likePost,
    dislikePost,
    getSinglePost
} from '../controllers/userControllers.js';

const router = express.Router();

router.use(checkAuth);

router.post("/create-post", createPost);
router.put("/edit-post", editPost);
router.get("/get-post/:postId", getSinglePost);
router.delete("/delete-post/:postId", deletePost);
router.get("/get-posts", getPosts);
router.get("/get-posts/:userId", loggedUserPosts);
router.post("/like-post", likePost);
router.post("/dislike-post", dislikePost);


export default router