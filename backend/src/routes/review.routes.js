const express = require('express');
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { reviewSchema } = require('../utils/validationSchemas');

const router = express.Router();

// Create review (clients only)
router.post('/', authMiddleware, roleMiddleware(['client']), validateRequest(reviewSchema), reviewController.createReview);

// Get lawyer reviews (public endpoint)
router.get('/lawyer/:lawyerId', reviewController.getLawyerReviews);

module.exports = router;
