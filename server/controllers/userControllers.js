import Post from "../models/post-model.js";

export const createPost = async (req, res) => {
    const { userId, title, movie, content, desc, image } = req.body;
    console.log(req.body)
    const newPost = new Post({
        userId,
        title,
        movie,
        content,
        desc,
        image
    })

    try {
        await newPost.save()
        return res.status(200).json({ message: "Post created successfully" })
    } catch {
        return res.status(505).json({ message: "Internal Server Error" })
    }
}


///////////////////////////////////////////////////////////////////////////////////////

export const editPost = async (req, res) => {
    const { postId, title, movie, content, desc, image } = req.body;

    let post
    try {
        post = await Post.findByIdAndUpdate(postId, { title, movie, content, desc, image });
    } catch {
        return res.status(500).json("Internal server error")
    }
    if (!post) {
        return res.status(500).json("Failed to update post")
    }
    return res.status(200).json({ message: "Post updated successfully" })
}

///////////////////////////////////////////////////////////////////////////////////////

export const deletePost = async (req, res) => {
    const postId = req.params.postId
    const { userId } = req.body
    try {
        await Post.findOneAndDelete({ _id: postId, userId: userId });
    } catch {
        return res.status(500).json("Internal server error")
    }
    return res.status(200).json({ message: "Post deleted successfully" })
}

///////////////////////////////////////////////////////////////////////////////////////



export const getPosts = async (req, res) => {

    try {
        const allPosts = await Post.find().sort({ createdAt: -1 }).populate("userId");
        return res.status(200).json({ posts: allPosts })

    } catch {
        return res.status(404).json({ message: "Couldn't Find posts" })
    }

}

///////////////////////////////////////////////////////////////////////////////////////

export const loggedUserPosts = async (req, res) => {
    const loggedUserId = req.params.userId;
    try {
        const posts = await Post.find({ userId: loggedUserId });
        return res.status(200).json({ posts: posts })
    } catch (err) {
        return res.status(404).json({ message: "Couldn't Find posts", error: err })
    }
}

///////////////////////////////////////////////////////////////////////////////////////

export const likePost = async (req, res) => {

    const { userId, postId } = req.body;
    try {
        console.log(userId)
        const post = await Post.findById(postId);

        if (post.likes.includes(userId)) {
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
            return res.status(200).json({ liked: false, message: "like removed" });
        } else {
            if (post.dislikes.includes(userId)) {
                await Post.findByIdAndUpdate(postId, { $pull: { dislikes: userId } }, { new: true });
            }
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({ liked: true, message: "like added" });
        }

    } catch {
        return res.status(404).json({ message: "Internal server Error" })
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////


export const dislikePost = async (req, res) => {
    const { userId, postId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.dislikes.includes(userId)) {
            await Post.findByIdAndUpdate(postId, { $pull: { dislikes: userId } }, { new: true });
            return res.status(200).json({ disliked: false, message: "Dislike removed" });
        } else {
            if (post.likes.includes(userId)) {
                await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
            }
            post.dislikes.push(userId);
            await post.save();
            return res.status(200).json({ disliked: true, message: "Dislike added" });
        }

    } catch (error) {
        console.error("Error disliking post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



export const getSinglePost = async (req, res) => {
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        return res.status(200).json({ post })
    } catch {
        return res.status(404).json({ message: "Internal server error" })
    }
}
