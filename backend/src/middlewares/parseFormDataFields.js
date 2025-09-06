/**
 * Middleware to parse JSON fields in FormData requests
 * This middleware handles the case where complex data structures (arrays, objects)
 * are sent as JSON strings in FormData and need to be parsed before validation
 */

const parseFormDataFields = (req, res, next) => {
  // Only process if this is a multipart/form-data request (has files)
  if (!req.files || Object.keys(req.files).length === 0) {
    return next();
  }

  try {
    // List of fields that should be parsed as JSON
    const jsonFields = [
      'specialization',
      'court_practice', 
      'fee_structure',
      'languages',
      'secondary_specialization'
    ];

    // Parse JSON fields
    jsonFields.forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (parseError) {
          console.warn(`Failed to parse JSON field '${field}':`, parseError.message);
          // Keep the original value if parsing fails
        }
      }
    });

    // Convert numeric fields
    if (req.body.years_experience && typeof req.body.years_experience === 'string') {
      const parsed = parseInt(req.body.years_experience, 10);
      if (!isNaN(parsed)) {
        req.body.years_experience = parsed;
      } else {
        console.warn(`Invalid years_experience value: ${req.body.years_experience}`);
      }
    }

    console.log('✅ FormData fields parsed successfully');
    console.log('📋 Parsed body:', JSON.stringify(req.body, null, 2));

  } catch (error) {
    console.error('❌ Error parsing FormData fields:', error);
    return res.status(400).json({
      message: 'Invalid data format in form fields',
      error: error.message
    });
  }

  next();
};

module.exports = parseFormDataFields;
