import { Answer } from "../models/Answer.js";
import { Question } from "../models/Question.js"

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const getQuestionByUpvotes = async (req, res) => {
    try {
        const query = {};
        const sort = { upvotes: -1 };
        const questions = await Question.find(query).sort(sort);
        res.json(questions)
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const createQuestion = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        let question = await Question.create({ title, content, author });
        // console.log("question added successfully");
        res.status(201).json({
            success: true,
            message: "Question added successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }

}

export const updateQuestion = async (req, res) => {
    try {
        const { title, content } = req.body;
        const question = await Question.findOne({ title });

        if (!question) return res.status(404).json({
            success: false,
            message: "No such question found"
        })

        const filter = { title: title };
        const updateDoc = {
            $set: {
                content: content
            },
        };
        const result = await Question.updateOne(filter, updateDoc);
        res.status(200).json({
            success: true,
            message: "Question updated successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const deleteQuestion = async (req, res) => {
    try {
        const { title } = req.body;
        const question = await Question.findOne({ title });
        if (!question) return res.status(404).json({
            success: false,
            message: "No such question found"
        });
        const result = await Question.deleteOne(question);
        res.status(200).json({
            success: true,
            message: "Question deleted successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const upvoteQuestion = async (req, res) => {
    try {
        const { title } = req.body;
        const question = await Question.findOne({ title });
        if (!question) return res.status(404).json({
            success: false,
            message: "No such question found"
        });
        const filter = { title: title };
        const updateDoc = {
            $inc: {
                upvotes: 1
            },
        };
        const result = await Question.updateOne(filter, updateDoc);
        res.status(200).json({
            success: true,
            message: "Question upvoted successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const downvoteQuestion = async (req, res) => {
    try {
        const { title } = req.body;
        const question = await Question.findOne({ title });
        if (!question) return res.status(404).json({
            success: false,
            message: "No such question found"
        });
        const filter = { title: title };
        const updateDoc = {
            $inc: {
                downvotes: -1
            },
        };
        const result = await Question.updateOne(filter, updateDoc);
        res.status(200).json({
            success: true,
            message: "Question downvoted successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }

}

export const upvoteAnswer = async (req, res) => {
    try {
        const { _id } = req.body;
        const answer = await Answer.findOne({ _id });
        if (!answer) return res.status(404).json({
            success: false,
            message: "No such answer found"
        });
        const filter = { _id: _id };
        const updateDoc = {
            $inc: {
                upvotes: 1
            },
        };
        const result = await Answer.updateOne(filter, updateDoc);
        res.status(200).json({
            success: true,
            message: "Answer upvoted successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const downvoteAnswer = async (req, res) => {
    try {
        const { _id } = req.body;
        const answer = await Answer.findOne({ _id });
        if (!answer) return res.status(404).json({
            success: false,
            message: "No such answer found"
        });
        const filter = { _id: _id };
        const updateDoc = {
            $inc: {
                upvotes: -1
            },
        };
        const result = await Answer.updateOne(filter, updateDoc);
        res.status(200).json({
            success: true,
            message: "Answer downvoted successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const writeAnswer = async (req, res) => {
    try {
        const { title, answerContent, answerAuthor } = req.body;
        const question = await Question.findOne({ title });
        if (!question) return res.status(404).json({
            success: false,
            message: "No such question found"
        });
        let answer = await Answer.create({ content: answerContent, author: answerAuthor });
        const filter = { title: title };
        const updateDoc = {
            $push: {
                answers: answer
            },
        };
        const result = await Question.updateOne(filter, updateDoc);
        res.status(200).json({
            success: true,
            message: "Answer added successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const writeCommentQ = async (req, res) => {
    try {
        const { title, content } = req.body;
        const question = await Question.findOne({ title });
        if (!question) return res.status(404).json({
            success: false,
            message: "No such question found"
        });
        const filter = { title: title };
        const updateDoc = {
            $push: {
                comments: content
            },
        };
        const result = await Question.updateOne(filter, updateDoc);
        res.status(200).json({
            success: true,
            message: "Comment added successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const writeCommentA = async (req, res) => {
    try {
        const { _id, content } = req.body;
        const answer = await Answer.findOne({ _id });
        if (!answer) return res.status(404).json({
            success: false,
            message: "No such answer found"
        });
        const filter = { _id: _id };
        const updateDoc = {
            $push: {
                comments: content
            },
        };
        const result = await Answer.updateOne(filter, updateDoc);
        res.status(200).json({
            success: true,
            message: "Comment added successfully"
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}