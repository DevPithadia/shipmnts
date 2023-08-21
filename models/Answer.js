import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    // title: {
    //     type: String,
    //     required: true
    // },
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
    }
});

export const Answer = mongoose.model("Answer", answerSchema);