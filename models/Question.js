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
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    answers: {
        type: [{ type: String }]
    },
    comments: {
        type: [{ type: String }]
    }
});

export const Question = mongoose.model("Question", questionSchema);