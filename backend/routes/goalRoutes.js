const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalControllers');
const { protect } = require('../middleware/authMiddleware');

// ROUTES

// CREATE

// router.post('/', createGoal);

// READ

// router.get('/', getGoals);

// UPDATE

// router.put('/', updateGoal);

// DELETE

// router.delete('/', deleteGoal);

router.route('/').get(protect, getGoals).post(protect, createGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);



module.exports = router;