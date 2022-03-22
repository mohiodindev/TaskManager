const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../Errors/custom-error')


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.json({ tasks })
});


const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(200).json({ task });
});


const getTask = asyncWrapper(async (req, res , next) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
        return next(createCustomError(`Id not found with this ID : ${taskId}` , 404))
     }
    res.json({ task });
});


const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    let task = await Task.findOneAndUpdate({ _id: taskId }, req.body,
        {
            new: true,
            runValidators: true
        }
    )
    if (!task) {
        return next(createCustomError(`Id not found with this ID : ${taskId}` , 404))
     }
    res.status(200).json({ task })
});


const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
        return next(createCustomError(`Id not found with this ID : ${taskId}` , 404))
     }
    res.status(200).json({ task: null, status: 'success' });
});


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};