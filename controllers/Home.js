import { Question } from "../models/Question.js"

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

export const createQuestion = async (req, res) => {
    const { title, content, author } = req.body;
    let question = await Question.create({ title, content, author });
    // console.log("question added successfully");
    res.status(201).json({
        success: true,
        message: "Question added successfully"
    });
}

export const updateQuestion = async (req, res) => {
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

export const deleteQuestion = async (req, res) => {
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

export const upvoteQuestion = async (req, res) => {
    const { title } = req.body;
    const question = await Question.findOne({ title });
    if (!question) return res.status(404).json({
        success: false,
        message: "No such question found"
    });
    const filter = { title: title };
    const updateDoc = {
        $inc: {
            votes: 1
        },
    };
    const result = await Question.updateOne(filter, updateDoc);
    res.status(200).json({
        success: true,
        message: "Question upvoted successfully"
    });
}

export const downvoteQuestion = async (req, res) => {
    const { title } = req.body;
    const question = await Question.findOne({ title });
    if (!question) return res.status(404).json({
        success: false,
        message: "No such question found"
    });
    const filter = { title: title };
    const updateDoc = {
        $inc: {
            votes: -1
        },
    };
    const result = await Question.updateOne(filter, updateDoc);
    res.status(200).json({
        success: true,
        message: "Question downvoted successfully"
    });
}

export const writeAnswer = async (req, res) => {
    const { title, answerContent } = req.body;
    const question = await Question.findOne({ title });
    if (!question) return res.status(404).json({
        success: false,
        message: "No such question found"
    });
    const filter = { title: title };
    const updateDoc = {
        $push: {
            answers: answerContent
        },
    };
    const result = await Question.updateOne(filter, updateDoc);
    res.status(200).json({
        success: true,
        message: "Answer added successfully"
    });
}