const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { verifyCsrfToken } = require('../middlewares/csrfMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { validateRequest } = require('../middlewares/validateRequest');
const { reviewSchema } = require('../utils/validationSchemas');

const router = express.Router();

// Create review (clients only) - needs CSRF protection for state-changing operation
router.post('/', authMiddleware, roleMiddleware(['client']), verifyCsrfToken, validateRequest(reviewSchema), reviewController.createReview);

// Get client's own reviews (authenticated endpoint)
// TODO: Implement getClientReviews method in reviewController
// router.get('/client', authMiddleware, roleMiddleware(['client']), reviewController.getClientReviews);

// Update review (clients only) - needs CSRF protection
// TODO: Implement updateReview method in reviewController
// router.put('/:id', authMiddleware, roleMiddleware(['client']), verifyCsrfToken, validateRequest(reviewSchema), reviewController.updateReview);

// Delete review (clients only) - needs CSRF protection
// TODO: Implement deleteReview method in reviewController
// router.delete('/:id', authMiddleware, roleMiddleware(['client']), verifyCsrfToken, reviewController.deleteReview);

// Get lawyer reviews (public endpoint) - no CSRF needed for read operation
router.get('/lawyer/:lawyerId', reviewController.getLawyerReviews);

module.exports = router;
