import mongoose from "mongoose";


export const postSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 50,
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
    comments:[ //
        {type: mongoose.Types.ObjectId,ref:"Comment"}
    ]
            
    
})



export const Post = mongoose.model("Post", postSchema)