# File Upload Test Guide

## Quick Start

### 1. Start the Backend Server
```bash
cd backend
npm run dev
```
Wait for the server to start and show S3 connection success.

### 2. Run the File Upload Test
```bash
cd backend
node test-file-upload.js
```

### 3. Follow the Interactive Prompts
- The test will request an OTP to be sent to: `test-lawyer-upload@kanoonwise.com`
- Check your email for the 6-digit OTP
- Enter the OTP when prompted
- The test will automatically run all upload scenarios

## What the Test Does

### ✅ **Test Scenarios Covered:**

1. **Authentication Flow**
   - ✓ Request OTP for test email
   - ✓ Verify OTP interactively
   - ✓ Get CSRF token for secure requests

2. **File Upload via Profile Update**
   - ✓ Upload photo (JPEG), CV (PDF), and bar registration certificate (JPEG)
   - ✓ Update profile with file metadata
   - ✓ Verify S3 storage and database records

3. **File Management**
   - ✓ Get file metadata from database
   - ✓ Generate pre-signed URLs for file access
   - ✓ Test file access via pre-signed URLs
   - ✓ Delete files from S3 and database

4. **Error Handling**
   - ✓ Validation errors for missing required fields
   - ✓ Invalid file type requests
   - ✓ Non-existent file operations

### 📁 **Test Files Created:**
- `test-files/test-photo.jpg` - Sample profile photo
- `test-files/test-cv.pdf` - Sample CV document
- `test-files/test-bar-cert.jpg` - Sample bar registration certificate

## Test Output Example

```
🚀 Starting file upload API tests...

📁 Created test-files directory
📷 Created test photo file
📄 Created test CV file
📜 Created test bar registration certificate
✅ All test files created successfully

🔐 Starting authentication process...
📧 Requesting OTP for test-lawyer-upload@kanoonwise.com...
✅ OTP requested successfully
📋 Please check your email for the OTP
🔢 Enter the OTP from your email: 123456
🔍 Verifying OTP...
✅ OTP verified successfully
🔒 Getting CSRF token...
✅ CSRF token obtained
🎉 Authentication completed successfully

📁 Testing file upload via profile update...
📎 Adding files to form data...
  ✓ Added photo file
  ✓ Added CV file
  ✓ Added bar registration certificate
🚀 Uploading files and updating profile...
✅ File upload and profile update successful

📋 Testing file metadata retrieval...
✅ File metadata retrieved successfully

🔗 Testing pre-signed URL generation...
✅ Pre-signed URLs generated successfully

🔍 Testing file access via pre-signed URL...
✅ File accessed successfully via pre-signed URL
📏 File size: 2048 bytes

⚠️ Testing error scenarios...
✅ Validation error handled correctly
✅ Invalid file type error handled correctly
✅ Non-existent file deletion error handled correctly

🗑️ Testing file deletion...
✅ File deleted successfully

🎉 All tests completed successfully!
🧹 Test files cleaned up
```

## Troubleshooting

### Common Issues:

1. **Server Not Running**
   ```
   ❌ Authentication failed: connect ECONNREFUSED 127.0.0.1:3000
   ```
   **Solution:** Make sure the backend server is running on port 3000

2. **Database Connection Issues**
   ```
   ❌ Authentication failed: Internal server error
   ```
   **Solution:** Check database connection and environment variables

3. **S3 Connection Issues**
   ```
   ❌ File upload failed: S3 upload error
   ```
   **Solution:** Verify AWS credentials and S3 bucket configuration

4. **Email Not Received**
   ```
   📋 Please check your email for the OTP
   ```
   **Solution:** Check spam folder or use a real email that can receive mail

5. **Invalid OTP**
   ```
   ❌ OTP verification failed: { message: 'Invalid OTP.' }
   ```
   **Solution:** Enter the exact 6-digit OTP from your email

## Environment Requirements

Make sure these environment variables are set in your `.env` file:

```env
# Database
DATABASE_URL=your_database_url

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
S3_BUCKET_NAME=your_bucket_name

# Email (for OTP)
EMAIL_SERVICE_CONFIG=your_email_config
```

## Test Cleanup

The test automatically cleans up:
- ✓ Test files from local filesystem
- ✓ Uploaded files from S3 bucket
- ✓ Database records for test uploads

No manual cleanup required!
