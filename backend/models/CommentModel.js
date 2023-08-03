import mongoose from "mongoose";


export const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        immutable: true,
    }, 
    image: {
        type: {
            url: String,
            imageId: String,
        },
        required: false
    }
            
    
})



export const Comment = mongoose.model("Comment", commentSchema)