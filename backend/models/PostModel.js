import mongoose from "mongoose";


export const postSchema = new mongoose.Schema({
    threadTitle: {
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

//Categorie <Generally> muss default bleiben, der Rest ist frei wählbar
//Reihenfolge ist Wichtig, die Categories müssen hier aufgelistet werden
//Nur wenn die Categorie hier importiert wird, wird sie Aufgelistet (ändern später)

export const General = mongoose.model("General", postSchema)
export const Post = mongoose.model("Post", postSchema)
export const Hakunamatata = mongoose.model("Hakunamatata", postSchema)
export const Test = mongoose.model("Test", postSchema)
export const Test2 = mongoose.model("Test2", postSchema)

