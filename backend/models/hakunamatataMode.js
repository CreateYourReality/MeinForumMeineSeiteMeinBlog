import mongoose from "mongoose";


const hakunamatataSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true
    }
})



export const Hakunamatata = mongoose.model("Hakunamatata", hakunamatataSchema)