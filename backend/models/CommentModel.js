import mongoose from "mongoose";


export const commentSchema = new mongoose.Schema({
    PostID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        immutable: true,
    }, 
    image: {
        type: {
            url: String,
            imageId: String,
        },
        required: false
    },
    comments:[{type: mongoose.Types.ObjectId}]
            
    
})



export const Comment = mongoose.model("Comment", commentSchema)