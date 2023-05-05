import { Task } from "../models/tasks.js";
import mongoose from "mongoose";
import 'express-async-errors';
import ErrorHandler from "../middlewares/error.js";

export const newTask = async (req, res, next) => {
    const { title, desc } = req.body;

    const task = await Task.create({ title, desc, user: req.user });

    // success
    // return next(new ErrorHandler('Task created successfully', 201, true));
    return res.status(200).json({
        success: true,
        message: 'Task created successfully',
        task : task
    })
}

export const myTasks = async (req, res) => {
    const userId = req.user._id;

    const tasksList = await Task.find({ user: userId });

    return res.status(200).json({
        success: true,
        tasks: tasksList
    })
}

export const updateTask = async (req, res, next) => {
    // find task from passed id in the url
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new ErrorHandler('Invalid task ID', 404, false));
    }

    const task = await Task.findById(req.params.id);

    if (!task) next(new ErrorHandler('Task not found', 404, false));

    // update task
    task.isCompleted = !task.isCompleted;
    await task.save();

    // success
    return next(new ErrorHandler('Task updated successfully', 200, true));
}

export const deleteTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id); 

    if (!task) next(new ErrorHandler('Task not found', 404, false));

    await task.deleteOne();

    // success
    return next(new ErrorHandler('Task deleted successfully', 200, true));
}