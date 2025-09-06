# Lawyer Profile File Upload System - Integrated Registration

## Overview

This system implements secure file upload functionality integrated into the existing lawyer registration flow using AWS S3 with the following features:

- **Seamless Integration**: File uploads work with the existing `/api/lawyer/profile` endpoint
- **Backward Compatibility**: Profile updates work with or without files
- **Secure Storage**: Files are stored privately in AWS S3 with server-side encryption
- **Access Control**: Only authenticated lawyers can upload/access their files
- **Pre-signed URLs**: Temporary secure access to files without exposing S3 credentials
- **File Validation**: MIME type and size validation for security
- **Metadata Storage**: File information stored in PostgreSQL database as JSON

## Architecture

### Integration Approach

The file upload functionality is integrated into the existing lawyer registration workflow:

1. **Existing Flow**: Lawyer registers → OTP verification → Profile creation
2. **Enhanced Flow**: Lawyer registers → OTP verification → Profile creation **with files**

The same `/api/lawyer/profile` PUT endpoint now handles both:
- Traditional JSON profile data
- Multipart form data with files + profile data

### Components

1. **S3 Configuration** (`src/config/s3Config.js`)
   - AWS SDK v3 client setup
   - Environment validation
   - Configuration constants

2. **S3 Service** (`src/services/s3Service.js`)
   - File upload/delete operations
   - Pre-signed URL generation
   - File validation logic

3. **File Upload Middleware** (`src/middlewares/fileUploadMiddleware.js`)
   - Multer configuration for memory storage
   - File type validation
   - Error handling

4. **Enhanced Lawyer Controller** (`src/controllers/lawyerController.js`)
   - Detects presence of files and routes accordingly
   - Maintains backward compatibility

5. **Integrated Routes** (`src/routes/lawyer.routes.js`)
   - Enhanced `/api/lawyer/profile` endpoint
   - Additional file management endpoints

## API Endpoints

### 1. Integrated Profile Update (Registration)
```
PUT /api/lawyer/profile
Content-Type: multipart/form-data OR application/json
Authentication: Required (Lawyer role)
CSRF Protection: Required
```

**With Files (multipart/form-data):**
```
Form Fields:
- full_name: "John Doe"
- bar_registration_number: "BAR123456"
- specialization: ["Criminal Law"]
- photo: [file]
- cv: [file]
- bar_registration_file: [file]
... other profile fields
```

**Without Files (application/json):**
```json
{
  "full_name": "John Doe",
  "bar_registration_number": "BAR123456",
  "specialization": ["Criminal Law"],
  "city": "Delhi"
}
```

**Response (both cases):**
```json
{
  "message": "Profile updated successfully with files",
  "profile": {
    "id": "uuid",
    "full_name": "John Doe",
    "files": {
      "photo": {
        "originalName": "profile.jpg",
        "mimeType": "image/jpeg",
        "size": 1048576,
        "uploadedAt": "2025-09-04T10:00:00Z",
        "hasFile": true
      },
      "cv": { "hasFile": false },
      "bar_registration_file": { "hasFile": false }
    }
  }
}
```

### 2. Get File URLs
```
GET /api/lawyer/profile/files/urls?fileTypes=photo,cv,bar_registration_file
Authentication: Required (Lawyer role)
```

### 3. Get File Metadata
```
GET /api/lawyer/profile/files/metadata
Authentication: Required (Lawyer role)
```

### 4. Delete File
```
DELETE /api/lawyer/profile/files/:fileType
Authentication: Required (Lawyer role)
CSRF Protection: Required
```

## Frontend Integration

### Current Registration Flow Enhancement

The existing `LawyerInvitation.jsx` component can be enhanced to support file uploads:

**Before (JSON only):**
```javascript
const profileData = {
  full_name: formData.fullName,
  bar_registration_number: formData.barRegistration,
  // ... other fields
};

await axiosInstance.put("/lawyer/profile", profileData);
```

**After (with files):**
```javascript
const formData = new FormData();

// Add profile data
formData.append('full_name', formData.fullName);
formData.append('bar_registration_number', formData.barRegistration);
// ... other text fields

// Add files if selected
if (formData.photoFile) {
  formData.append('photo', formData.photoFile);
}
if (formData.resumeFile) {
  formData.append('cv', formData.resumeFile);
}
if (formData.barRegistrationFile) {
  formData.append('bar_registration_file', formData.barRegistrationFile);
}

await axiosInstance.put("/lawyer/profile", formData);
```

### Backward Compatibility

The system maintains full backward compatibility:
- Existing registrations without files continue to work
- Frontend can choose to send JSON or FormData
- No breaking changes to existing API contracts

## Configuration

### Environment Variables

Add to your `.env` file:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=kanoonwise-lawyer-files
```

### File Constraints

- **Maximum file size**: 10MB
- **Allowed file types**:
  - Photo: JPEG, PNG, JPG
  - CV: PDF, DOC, DOCX
  - Bar Registration: PDF, JPEG, PNG, JPG

## Database Schema

Files are stored as JSON in the LawyerProfile model:

```sql
-- Migration applied automatically
ALTER TABLE "LawyerProfiles" 
ALTER COLUMN photo TYPE JSON,
ALTER COLUMN cv TYPE JSON,
ALTER COLUMN bar_registration_file TYPE JSON;
```

**JSON Structure:**
```json
{
  "bucket": "kanoonwise-lawyer-files",
  "key": "lawyer-profiles/photos/user-id-uuid.jpg",
  "originalName": "profile.jpg",
  "mimeType": "image/jpeg",
  "size": 1048576,
  "uploadedAt": "2025-09-04T10:00:00Z",
  "fileType": "photo"
}
```

## Testing

### Integrated Registration Flow Test

Run the integrated test:

```bash
cd backend
node test-integrated-registration.js
```

The test covers:
- Complete registration flow with files
- Backward compatibility (registration without files)
- Profile updates with partial files
- File metadata and URL generation

### Individual Components Test

Test file upload components separately:

```bash
cd backend
node test-file-upload.js
```

## Migration Guide

### For Existing Deployments

1. **Run database migration:**
   ```bash
   npm run migrate
   ```

2. **Add environment variables**
3. **Deploy updated code**
4. **Test both old and new registration flows**

### For Frontend Updates

1. **Optional Enhancement**: Add file upload fields to registration form
2. **No Breaking Changes**: Existing registration continues to work
3. **Progressive Enhancement**: Can add file support gradually

## Security Features

1. **Private Storage**: Files are not publicly accessible
2. **Pre-signed URLs**: Temporary access with automatic expiration (15 minutes)
3. **Authentication**: Only authenticated lawyers can access their files
4. **File Validation**: MIME type and size checking
5. **CSRF Protection**: Required for state-changing operations
6. **Server-side Encryption**: AES256 encryption at rest
7. **Access Logging**: All S3 operations are logged

## Benefits of Integration

1. **Seamless UX**: Single step registration with files
2. **Backward Compatibility**: No breaking changes
3. **Reduced Complexity**: One endpoint handles both cases
4. **Consistent Error Handling**: Unified error response format
5. **Atomic Operations**: Profile and files created together
6. **Easy Frontend Migration**: Minimal frontend changes required
