import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    votes: {
        type: Number,
    },
    answers: {
        type: String
    }
});

export const Question = mongoose.model("Question", questionSchema);