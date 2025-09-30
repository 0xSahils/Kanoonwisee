# KanoonWise Copilot Instructions

## Architecture Overview

KanoonWise is a full-stack legal platform with strict separation:
- **Frontend**: React 19 + Redux Toolkit + Vite (port 5173)
- **Backend**: Express.js + Sequelize + PostgreSQL (port 3000)
- **Production**: Single service on Render serving both API and static React build

## Key Development Patterns

### Authentication System
- **OTP-only authentication** - no passwords, uses email-based 6-digit codes
- **httpOnly cookies** for JWT tokens (access + refresh), no localStorage/headers
- **Role-based routing**: `/lawyer/*`, `/client/*`, `/admin/*` with strict separation
- CSRF protection via tokens and session management for state-changing operations

### Database Architecture
- **Sequelize migrations** drive schema changes - always use `npm run db:migrate`
- **UUID primary keys** for all models (User, LawyerProfile, ClientProfile, Appointment, Review)
- **Role enum**: `['lawyer', 'admin', 'client']` on User model
- File paths stored as strings, not JSON (see migration `20250905000001-revert-file-columns-to-string.js`)

### File Upload Workflow
- **AWS S3 integration** with presigned URLs for direct upload
- Timeout handling: 60-second server timeout for file operations
- File types: profile photos, CV documents, bar registration certificates
- Upload endpoints at `/api/files/*` with role-specific validation

## Essential Commands

```bash
# Full build (installs frontend + backend, builds React, runs migrations)
npm run build

# Development servers (run separately)
cd backend; npm run dev    # Backend with nodemon
cd frontend; npm run dev   # Frontend with Vite

# Database operations
cd backend; npm run db:migrate     # Run migrations
cd backend; npm run db:seed:all    # Seed sample data

# Testing utilities
cd backend; npm run test:s3        # Test S3 connection
cd backend; npm run test:upload    # Test file upload flow
cd backend; npm run test:registration  # Test auth flow
```

## Redux State Management

Frontend uses Redux Toolkit with domain slices:
- `authSlice` - user authentication, role routing
- `lawyerSlice` - lawyer profile, appointments
- `clientSlice` - client profile, lawyer search
- `appointmentSlice` - booking, management
- `reviewSlice` - ratings, feedback

Axios instance (`/src/api/axiosInstance.js`) handles:
- Automatic CSRF token management
- JWT refresh token flow
- Role-based error handling and redirects

## Environment Configuration

Critical env vars for development:
```bash
# Backend (.env in backend/)
DB_URL=postgresql://...              # Neon PostgreSQL connection
JWT_SECRET=...                       # Token signing
AWS_ACCESS_KEY_ID=...               # S3 file storage
SMTP_USER/SMTP_PASS=...             # Gmail for OTP emails

# Frontend (.env in frontend/)
VITE_API_URL=http://localhost:3000/api
```

## Production Deployment Specifics

- **Single Render service** defined in `render.yaml`
- Backend serves React static files from `frontend/dist/`
- Automatic migrations via `fix-partial-migration.js` on startup
- Production DB is Neon PostgreSQL with SSL required

## Common Debugging Patterns

1. **Auth issues**: Check cookie presence, CSRF token, role routing
2. **File upload timeouts**: Verify S3 credentials, increase timeout settings
3. **DB connection**: Use `node backend/debug.js` to test connection
4. **Migration conflicts**: Check migration order in `/backend/migrations/`

## Code Conventions

- **Error handling**: Consistent error codes (`AUTH_TOKEN_EXPIRED`, `CSRF_INVALID`)
- **File structure**: Domain-based folders (`/auth/`, `/lawyer/`, `/client/`)
- **API responses**: JSON with message/data structure
- **React patterns**: Function components, React Hook Form + Zod validation

When making changes, always consider the role-based access patterns and the OTP authentication flow that's central to the platform's security model.