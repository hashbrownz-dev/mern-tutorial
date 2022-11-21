const asyncHandler = require('express-async-handler');

// CREATE

// @desc    Create goal
// @route   POST /api/goals
// @access  public

const createGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }
})

// READ

// @desc    Get goals
// @route   GET /api/goals
// @access  public

const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message : 'get goals'});
})

// UPDATE

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  public

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message : 'update goal', id : req.params.id });
})

// DELETE

// @desc    Delete Goal
// @route   DELETE /api/goals/:id
// @access  public

const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message : 'delete goal', id : req.params.id });
})

module.exports = {
    getGoals,
    deleteGoal,
    updateGoal,
    createGoal
}