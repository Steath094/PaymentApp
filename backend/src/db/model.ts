import mongoose, { model, modelNames } from "mongoose";

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

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

export const User =  mongoose.model("User", userSchema);
export const Account = mongoose.model("Account",accountSchema);