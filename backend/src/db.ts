import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        index: true,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
},{timestamps: true})


const User =  mongoose.model("User", userSchema);

module.exports ; {
    User
}