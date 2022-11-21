const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel')

// CREATE

// @desc    Create goal
// @route   POST /api/goals
// @access  public

const createGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal);
})

// READ

// @desc    Get goals
// @route   GET /api/goals
// @access  public

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json({message : goals});
})

// UPDATE

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  public

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error('Goal not found');
    }
    const updated = await Goal.findByIdAndUpdate(req.params.id, {text : req.body.text}, { new: true })
    res.status(200).json(updated);
})

// DELETE

// @desc    Delete Goal
// @route   DELETE /api/goals/:id
// @access  public

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error('Goal not found');
    }
    // const deleted = await Goal.findByIdAndDelete(req.params.id);
    // res.status(200).json(deleted);
    goal.remove();
    res.status(200).json({id:req.params.id});
})

module.exports = {
    getGoals,
    deleteGoal,
    updateGoal,
    createGoal
}