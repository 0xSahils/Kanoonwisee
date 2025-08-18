const reviewService = require('../services/reviewService');

const createReview = async (req, res, next) => {
    try {
        const review = await reviewService.createReview(req.user.id, req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getLawyerReviews = async (req, res, next) => {
    try {
        const { lawyerId } = req.params;
        const reviews = await reviewService.getLawyerReviews(lawyerId);
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReview,
    getLawyerReviews
};
