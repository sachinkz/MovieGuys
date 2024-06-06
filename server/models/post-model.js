import mongoose,{Schema} from "mongoose";

const postSchema= new Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
    title:{type:String, required:true},
    desc:{type:String, required:true},
    image:{type:String, required:true},
    content:{type:String, required:true},
    movie:{type:String, required:true},
    likes:[{type:mongoose.Types.ObjectId}],
    dislikes:[{type:mongoose.Types.ObjectId}]
})

const Post=mongoose.model('Post',postSchema)

export default Post;