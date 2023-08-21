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
    }
});

export const Answer = mongoose.model("Answer", answerSchema);