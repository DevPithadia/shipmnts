import express from "express";
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { getMyProfile, login, logout, register } from "./controllers/User.js";
import { isAuthenticated } from "./middlewares/auth.js";
import cors from "cors";
import { createQuestion, deleteQuestion, downvoteQuestion, getQuestions, updateQuestion, upvoteQuestion, writeAnswer } from "./controllers/Home.js";

const app = express();

config({
    path: "./data/config.env"
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}))

mongoose.connect(process.env.MONGO_URI, { dbName: "Shipmnts" },)
    .then(() => { console.log("db connected") })
    .catch((e) => { console.log(e) });

app.listen(process.env.PORT, () => {
    console.log("Server is working on port : ", process.env.PORT);
})

app.post("/new", register);
app.post("/login", login);
app.get("/me", isAuthenticated, getMyProfile);
app.get("/logout", logout);
app.get("/getQuestions", getQuestions);
app.post("/createQuestion", createQuestion);
app.post("/updateQuestion", updateQuestion);
app.get("/deleteQuestion", deleteQuestion);
app.post("/upvoteQuestion", upvoteQuestion);
app.post("/downvoteQuestion", downvoteQuestion);
app.post("/writeAnswer", writeAnswer);