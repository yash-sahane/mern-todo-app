import { User } from "../models/users.js";
import bcrypt from 'bcrypt';
import { createCookie } from "../utils/token.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {
    const userList = await User.find({});

    return res.status(200).json({
        success: true,
        userList: userList
    })
}

export const registerUser = async (req, res, next) => {
    // 1. fetch the user data from post
    const { name, email, pass } = req.body;

    // 2. find user in database
    let user = await User.findOne({ email });

    // 3. if found send json error
    if (user) {
        return next(new ErrorHandler('User Already Registered', 409, false));
    }

    // 4. if not found then for storing use pass use hashing

    const hashedPass = await bcrypt.hash(pass, 10);

    user = await User.create({ name, email, pass: hashedPass });

    // 5. if want to login user after completing registration use token process for creating cookie
    createCookie(user,req, res, 201, 'User registered successfully');
}

export const loginUser = async (req, res, next) => {
    const { email, pass } = req.body;

    let user = await User.findOne({ email }).select('+pass');

    if (!user) {
        return next(new ErrorHandler('User not found', 404, false));
    }

    const isPassValid = await bcrypt.compare(pass, user.pass);

    if (!isPassValid) {
        return next(new ErrorHandler('Invalid Password', 404, false));
    }

    // createCookie(user, res, 200, message = {
    //     success: true,
    //     msg: 'User loggedin successfully',
    //     id: user._id,
    //     email
    // })
    createCookie(user,req, res, 200, `Welcome back ${user.name}`)
}

export const fetchMyProfile = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    })
}

export const logoutUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'User logged out successfully',
        user: req.user
    })
}