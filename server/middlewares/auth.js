import { User } from "../models/users.js";
import jwt from 'jsonwebtoken';
import ErrorHandler from "./error.js";

const isAuthenticated = async (req, res, next) => {
    const { token } = req.headers
    console.log(token);

    if (!token) {
        return next(new ErrorHandler('Please login first', 401, false))
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decoded.id);
    next();
}

export default isAuthenticated;