import mongoose from "mongoose";
const Schema = mongoose.Schema

const userModel = new Schema ({
    username : {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    }
})

export default mongoose.model("User", userModel)
