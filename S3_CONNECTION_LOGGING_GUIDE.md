# S3 Connection and Logging Guide

## Overview

The KanoonWise file upload system now includes comprehensive logging and S3 connectivity checking to help with debugging and monitoring.

## S3 Connection Logging

### Automatic Connection Test
- The system automatically tests S3 connectivity when the server starts
- Connection status is logged with detailed information
- Helpful error messages for common issues

### Manual Connection Testing

#### 1. Command Line Test
```bash
cd backend
npm run test:s3
```

#### 2. API Health Check
```
GET /api/health/s3
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "S3 bucket is accessible",
  "bucket": "kanoonwise-lawyer-files",
  "region": "us-east-1",
  "timestamp": "2025-09-05T10:00:00.000Z"
}
```

**Response (Failure):**
```json
{
  "status": "error",
  "message": "S3 bucket is not accessible",
  "bucket": "kanoonwise-lawyer-files",
  "region": "us-east-1",
  "timestamp": "2025-09-05T10:00:00.000Z"
}
```

#### 3. General Health Check
```
GET /api/health
```

## Logging Features

### Console Logging
The system provides detailed console logs for:

#### S3 Operations
```
☁️ [2025-09-05T10:00:00.000Z] [S3] Testing S3 bucket connectivity...
✅ [2025-09-05T10:00:00.000Z] [S3] S3 bucket is accessible
📤 [2025-09-05T10:00:00.000Z] [S3] Uploading file to S3: lawyer-profiles/photos/user-123-abc.jpg
   Size: 1048576 bytes
   MIME Type: image/jpeg
✅ [2025-09-05T10:00:00.000Z] [S3] File uploaded successfully: lawyer-profiles/photos/user-123-abc.jpg
🔗 [2025-09-05T10:00:00.000Z] [S3] Generating pre-signed URL for: lawyer-profiles/photos/user-123-abc.jpg
   Expires in: 900 seconds
✅ [2025-09-05T10:00:00.000Z] [S3] Pre-signed URL generated successfully
🗑️ [2025-09-05T10:00:00.000Z] [S3] Deleting file from S3: lawyer-profiles/photos/old-photo.jpg
✅ [2025-09-05T10:00:00.000Z] [S3] Successfully deleted file: lawyer-profiles/photos/old-photo.jpg
```

#### File Operations
```
📝 [2025-09-05T10:00:00.000Z] [UPLOAD] Creating/updating lawyer profile with files for user: user-123
📁 [2025-09-05T10:00:00.000Z] [UPLOAD] Files received: photo, cv
📤 [2025-09-05T10:00:00.000Z] [UPLOAD] Processing photo: profile.jpg (1048576 bytes)
✅ [2025-09-05T10:00:00.000Z] [UPLOAD] photo uploaded successfully
⏳ [2025-09-05T10:00:00.000Z] [UPLOAD] Waiting for 2 file operations to complete...
✅ [2025-09-05T10:00:00.000Z] [UPLOAD] All file operations completed
📝 [2025-09-05T10:00:00.000Z] [UPLOAD] Updating existing profile for user: user-123
```

#### Error Logging
```
❌ [2025-09-05T10:00:00.000Z] [S3] S3 bucket connection failed
{
  "bucket": "kanoonwise-lawyer-files",
  "region": "us-east-1",
  "accessKey": "AKIA****",
  "error": "The specified bucket does not exist",
  "errorCode": "NotFound"
}
⚠️ [2025-09-05T10:00:00.000Z] [S3] Bucket does not exist or is in a different region
```

## Testing Commands

### Available NPM Scripts
```bash
# Test S3 connection only
npm run test:s3

# Test file upload functionality  
npm run test:upload

# Test complete registration flow
npm run test:registration
```

### Environment Setup Verification
Before running tests, ensure your `.env` file contains:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=kanoonwise-lawyer-files
```

## Troubleshooting Common Issues

### 1. "Bucket does not exist"
- Verify the bucket name in `AWS_S3_BUCKET_NAME`
- Check if the bucket is in the correct region
- Ensure the bucket exists in your AWS account

### 2. "Access denied"
- Verify IAM user permissions
- Required permissions: `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject`, `s3:GetBucketLocation`
- Check if the IAM user has access to the specific bucket

### 3. "Invalid credentials"
- Verify `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
- Ensure credentials are active and not expired
- Check for any special characters in credentials

### 4. "Network connection issue"
- Check internet connectivity
- Verify AWS service status
- Check if there are any firewall restrictions

### 5. "Region mismatch"
- Ensure `AWS_REGION` matches the bucket's actual region
- Common regions: `us-east-1`, `us-west-2`, `eu-west-1`, `ap-south-1`

## Monitoring in Production

### Health Check Endpoints
Use these endpoints for monitoring:

1. **Application Health**: `GET /api/health`
2. **S3 Connectivity**: `GET /api/health/s3`
3. **Basic Server**: `GET /working`

### Log Monitoring
In production, monitor logs for:
- S3 connection failures
- File upload errors
- Authentication issues
- High error rates

### Alerts
Consider setting up alerts for:
- S3 connection failures
- Repeated upload failures
- Unusual error patterns
- API health check failures

## Best Practices

### 1. Environment Variables
- Never commit AWS credentials to version control
- Use different buckets for different environments
- Regularly rotate access keys

### 2. Error Handling
- Monitor error logs regularly
- Set up automated alerts for critical failures
- Have fallback mechanisms for S3 outages

### 3. Performance
- Monitor file upload times
- Track S3 operation success rates
- Monitor pre-signed URL generation times

### 4. Security
- Use private S3 buckets only
- Implement proper IAM policies with minimal permissions
- Monitor for unauthorized access attempts

This comprehensive logging system helps ensure reliable file uploads and quick issue resolution in production environments.
