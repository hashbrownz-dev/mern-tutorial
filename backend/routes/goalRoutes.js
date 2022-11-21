const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalControllers');

// ROUTES

// CREATE

// router.post('/', createGoal);

// READ

// router.get('/', getGoals);

// UPDATE

// router.put('/', updateGoal);

// DELETE

// router.delete('/', deleteGoal);

router.route('/').get(getGoals).post(createGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);



module.exports = router;