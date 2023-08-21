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
    answers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Answer'
    }]
});

export const Answer = mongoose.model("Answer", answerSchema);