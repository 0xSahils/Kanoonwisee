# File Upload Testing Guide

This directory contains comprehensive test scripts for the KanoonWise file upload functionality.

## Test Files Overview

### 1. `test-runner.js` - Main Test Runner
The primary entry point for running tests. Provides easy access to different test levels.

**Usage:**
```bash
# Quick infrastructure check (no authentication required)
node test-runner.js basic

# Complete end-to-end testing (requires email OTP)
node test-runner.js full

# Show help
node test-runner.js help
```

### 2. `test-basic-infrastructure.js` - Infrastructure Tests
Tests basic functionality without requiring authentication:
- ✅ API server responsiveness
- ✅ S3 bucket connectivity  
- ✅ Endpoint availability
- ✅ File creation capabilities
- ✅ FormData construction

**Usage:**
```bash
node test-basic-infrastructure.js
```

### 3. `test-file-upload-complete.js` - Full Integration Tests
Comprehensive end-to-end testing that requires authentication:
- 🔐 OTP email verification
- 📁 File upload via profile update
- 📋 File metadata retrieval
- 🔗 Pre-signed URL generation
- 🗑️ File deletion
- ⚠️ Error scenario handling
- 🔄 Backward compatibility testing

**Usage:**
```bash
node test-file-upload-complete.js
# You'll be prompted to enter OTP from email
```

## Prerequisites

1. **Backend Server Running:**
   ```bash
   cd backend
   npm run dev
   # Server should be running on http://localhost:3000
   ```

2. **Environment Variables:**
   Make sure your `.env` file contains:
   ```
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_BUCKET_NAME=your_bucket_name
   AWS_REGION=your_region
   DATABASE_URL=your_database_url
   ```

3. **Email Access:**
   For full tests, you need access to the email account used for OTP verification.

## Quick Start

1. **Start with basic tests:**
   ```bash
   node test-runner.js basic
   ```
   This will verify that all infrastructure is working correctly.

2. **Run full tests if basic tests pass:**
   ```bash
   node test-runner.js full
   ```
   Follow the prompts to enter the OTP from your email.

## Test Scenarios Covered

### Basic Infrastructure Tests
- [x] API server health check
- [x] S3 bucket connectivity test
- [x] CSRF token generation
- [x] Test file creation (JPEG, PDF)
- [x] FormData construction

### Full Integration Tests
- [x] OTP request and verification
- [x] CSRF token management
- [x] File upload via profile update (FormData)
- [x] JSON profile update (backward compatibility)
- [x] Profile data retrieval
- [x] File metadata retrieval
- [x] Pre-signed URL generation
- [x] File access via pre-signed URLs
- [x] File deletion
- [x] Error handling for invalid requests
- [x] Validation error testing

## Expected Output

### Successful Basic Test:
```
🚀 Running basic file upload infrastructure tests...

🏥 Testing API health...
✅ API is responding
🔒 CSRF token available: true

🔗 Testing S3 connection...
✅ S3 connection test successful

📊 Test Results Summary:
============================
API Health:        ✅ PASS
S3 Connection:     ✅ PASS
Endpoint Tests:    ✅ PASS
File Creation:     ✅ PASS
FormData Creation: ✅ PASS

🎯 Overall Score: 5/5 tests passed
🎉 All basic infrastructure tests passed!
```

### Successful Full Test:
```
🚀 Starting comprehensive file upload API tests...

📁 Created test-files directory
📷 Created test photo file
📄 Created test CV file

🏥 Testing S3 health endpoint...
✅ S3 health check successful

🔐 Starting authentication process...
📧 Requesting OTP for test-lawyer-upload@kanoonwise.com...
✅ OTP requested successfully
🔢 Enter the OTP from your email: 123456
🔍 Verifying OTP...
✅ OTP verified successfully

📁 Testing file upload via profile update...
✅ File upload and profile update successful

🎉 All tests completed successfully!
```

## Troubleshooting

### Common Issues:

1. **Server not running:**
   ```
   ❌ API health test failed: connect ECONNREFUSED
   ```
   **Solution:** Start the backend server with `npm run dev`

2. **S3 configuration issues:**
   ```
   ❌ S3 connection test failed: AccessDenied
   ```
   **Solution:** Check AWS credentials in `.env` file

3. **OTP verification fails:**
   ```
   ❌ OTP verification failed: Invalid OTP
   ```
   **Solution:** 
   - Check email for correct OTP
   - Ensure OTP hasn't expired (usually 10 minutes)
   - Verify email address is correct

4. **Database connection issues:**
   ```
   ❌ Authentication failed: Database connection error
   ```
   **Solution:** Check `DATABASE_URL` in `.env` file

## File Cleanup

Tests automatically clean up temporary files after completion. If tests are interrupted, you can manually remove the `test-files` directory:

```bash
rm -rf test-files
```

## API Endpoints Tested

- `GET /api/health/s3` - S3 connectivity check
- `GET /api/auth/csrf-token` - CSRF token generation
- `POST /api/auth/request-otp` - OTP request
- `POST /api/auth/verify-otp` - OTP verification
- `PUT /api/lawyer/profile` - Profile update (JSON and FormData)
- `GET /api/lawyer/profile` - Profile retrieval
- `GET /api/lawyer/profile/files/metadata` - File metadata
- `GET /api/lawyer/profile/files/urls` - Pre-signed URLs
- `DELETE /api/lawyer/profile/files/:fileType` - File deletion

## Integration with Frontend

These backend tests verify the API endpoints that the frontend LawyerInvitation.jsx component uses. The frontend changes include:

1. **Enhanced handleProfileSubmit()** - Detects files and switches between JSON/FormData
2. **File validation** - Client-side validation for file types and sizes
3. **Backward compatibility** - Maintains existing registration flow

## Next Steps

After tests pass:
1. Test the frontend registration flow manually
2. Verify file uploads appear in S3 bucket
3. Check database for file metadata storage
4. Test file downloads via pre-signed URLs

## Support

If tests fail consistently, check:
1. Server logs for detailed error messages
2. AWS S3 bucket permissions
3. Database connectivity
4. Environment variable configuration
