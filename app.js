import express from "express";
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { getMyProfile, login, logout, register } from "./controllers/User.js";
import { isAuthenticated } from "./middlewares/auth.js";
import cors from "cors";

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
