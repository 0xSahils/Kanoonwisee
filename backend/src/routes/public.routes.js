const express = require('express');
const clientController = require('../controllers/clientController');
const validateRequest = require('../middlewares/validateRequest');
const { lawyerSearchSchema } = require('../utils/validationSchemas');

const router = express.Router();

// Public lawyer search endpoints (no authentication required)
router.get('/lawyers', clientController.getAllLawyers);
router.get('/lawyers/search', validateRequest(lawyerSearchSchema), clientController.searchLawyers);
router.get('/lawyers/:id', clientController.getLawyerDetails);

module.exports = router;
