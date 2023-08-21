import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";


export const register = async (req, res) => {
    const { id, name, email, password } = req.body;

    let user = await User.findOne({ email })

    if (user) return res.status(404).json({
        success: false,
        message: "User already exists",
    })

    const hashesPassword = await bcrypt.hash(password, 10);

    user = await User.create({ id, name, email, password: hashesPassword });

    sendCookie(user, res, "Registered Successfully", 201);
};

export const login = async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(404).json({
        success: false,
        message: "Invalid email or password",
    })
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(404).json({
        success: false,
        message: "Invalid email or password",
    });

    sendCookie(user, res, `Welcome back ${user.name}`, 200);

};

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const logout = (req, res) => {

    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            user: req.user,
        });
};