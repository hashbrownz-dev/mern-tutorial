const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

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
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal);
})

// READ

// @desc    Get goals
// @route   GET /api/goals
// @access  public

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
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

    const user = await User.findById(req.user.id);

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized');
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
    
    const user = await User.findById(req.user.id);

    // Check for user
    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized');
    }
    goal.remove();
    res.status(200).json({id:req.params.id});
})

module.exports = {
    getGoals,
    deleteGoal,
    updateGoal,
    createGoal
}