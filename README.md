# KanoonWise - Legal Platform

[![Deployment Status](https://img.shields.io/badge/deployment-live-brightgreen)](https://kanoonwise-li7v.onrender.com)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-19.1.0-blue.svg)](https://reactjs.org/)

A comprehensive digital platform connecting lawyers and clients for legal consultations and services. KanoonWise streamlines the process of finding legal experts, booking consultations, and managing legal appointments across India.

## 🌟 Features

### For Lawyers
- **Professional Profiles**: Comprehensive profile management with specialization, experience, and credentials
- **Appointment Management**: Accept/reject consultation requests with calendar integration
- **Document Upload**: Secure file handling for CV, photos, and bar registration certificates
- **Dashboard Analytics**: View upcoming consultations, client requests, and earnings
- **Practice Management**: Set consultation fees, availability, and practice areas

### For Clients
- **Lawyer Discovery**: Advanced search with filters for specialization, location, fees, and ratings
- **Easy Booking**: Simple appointment booking system with multiple consultation types
- **Consultation Management**: Track upcoming and past consultations
- **Review System**: Rate and review lawyers after consultations
- **Profile Management**: Maintain personal legal history and preferences

### Shared Features
- **OTP Authentication**: Secure email-based login for both user types
- **Role-based Access**: Automatic redirection to appropriate dashboards
- **Real-time Notifications**: Email and in-app notifications for bookings and updates
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Secure Communication**: Protected routes and data encryption

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 19.1.0 with Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **UI Components**: Lucide React icons, react-hot-toast notifications
- **Calendar**: React Big Calendar for appointment scheduling

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT with refresh tokens and OTP verification
- **File Storage**: AWS S3 for document management
- **Email Service**: Nodemailer with Gmail SMTP
- **Security**: Helmet, CORS, CSRF protection, rate limiting
- **Session Management**: Express sessions with Sequelize store

### Infrastructure
- **Database**: Neon PostgreSQL (serverless)
- **Hosting**: Render.com
- **File Storage**: AWS S3
- **Email**: Gmail SMTP
- **Deployment**: Automated CI/CD with render.yaml

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or use provided Neon setup)
- AWS S3 bucket for file storage
- Gmail account with app password for emails

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/asima2006/Kanoonwise.git
   cd Kanoonwise
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies for both frontend and backend
   npm run build
   ```

3. **Environment Configuration**
   
   **Backend** - Create `backend/.env`:
   ```env
   # Database
   DB_URL=your_postgresql_connection_string
   NODE_ENV=development

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key
   JWT_ACCESS_EXPIRATION=15m
   JWT_REFRESH_EXPIRATION=7d

   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   EMAIL_FROM=your-email@gmail.com

   # AWS S3 Configuration
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET_NAME=your-bucket-name
   ```

   **Frontend** - Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Database Setup**
   ```bash
   cd backend
   npm run db:migrate
   npm run db:seed:all  # Optional: Add sample data
   ```

5. **Start Development Servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
kanoonwise/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   │   ├── auth/        # Authentication pages
│   │   │   ├── lawyer/      # Lawyer-specific pages
│   │   │   └── client/      # Client-specific pages
│   │   ├── store/           # Redux store and slices
│   │   ├── api/             # API layer and services
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── dist/                # Production build
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middlewares/     # Custom middleware
│   │   ├── config/          # Configuration files
│   │   └── utils/           # Helper utilities
│   ├── migrations/          # Database migrations
│   ├── seeders/             # Sample data
│   └── tests/               # API tests
├── docs/                     # Documentation
├── render.yaml              # Deployment configuration
└── package.json             # Root dependencies
```

## 🔐 Authentication Flow

1. **User Registration/Login**
   - User enters email and selects role (lawyer/client)
   - System sends 6-digit OTP to email
   - User verifies OTP to establish session
   - JWT tokens stored in secure HTTP-only cookies

2. **Role-based Routing**
   - Lawyers: Redirected to `/lawyer/dashboard`
   - Clients: Redirected to `/client/dashboard`
   - Protected routes ensure role-appropriate access

3. **Session Management**
   - Automatic token refresh for seamless experience
   - Secure logout clears all session data
   - Session persistence across browser restarts

## 📊 Database Schema

### Core Models
- **Users**: Authentication and basic user data
- **LawyerProfiles**: Lawyer-specific information and credentials
- **ClientProfiles**: Client personal and legal history
- **Appointments**: Consultation bookings and scheduling
- **Reviews**: Client feedback and ratings
- **UserSessions**: Session management for authentication

### Key Relationships
- User (1) → LawyerProfile/ClientProfile (1)
- LawyerProfile (1) → Appointments (Many)
- ClientProfile (1) → Appointments (Many)
- LawyerProfile (1) → Reviews (Many)

## 🚀 Deployment

### Production Deployment (Render)

The application is configured for automatic deployment on Render using `render.yaml`:

1. **Connect Repository**: Link your GitHub repository to Render
2. **Automatic Detection**: Render will detect the configuration automatically
3. **Environment Variables**: Set production environment variables in Render dashboard
4. **Deploy**: Click deploy and monitor the build process

### Build Process
1. Install backend dependencies
2. Install frontend dependencies
3. Build React application for production
4. Run database migrations
5. Start Express server serving both API and static files

### Environment Variables (Production)
All production environment variables are configured in `render.yaml`. Key variables include:
- Database connection (Neon PostgreSQL)
- JWT secrets for authentication
- AWS S3 configuration for file storage
- Email service configuration

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Test authentication flow
npm run test:auth

# Test S3 connection
npm run test:s3

# Test file upload functionality
npm run test:upload

# Test API endpoints
npm run test:api
```

### Manual Testing
- Authentication flows for both user types
- Appointment booking and management
- File upload for lawyer documents
- Search and filtering functionality

## 🛠️ API Documentation

### Authentication Endpoints
- `POST /api/auth/request-otp` - Request OTP for login
- `POST /api/auth/verify-otp` - Verify OTP and establish session
- `GET /api/auth/me` - Get current user information
- `POST /api/auth/logout` - Logout and clear session

### Lawyer Endpoints
- `GET /api/lawyer/profile` - Get lawyer profile
- `POST/PUT /api/lawyer/profile` - Create/update lawyer profile
- `GET /api/lawyer/appointments` - Get lawyer appointments
- `POST /api/lawyer/appointments/respond` - Accept/reject appointments

### Client Endpoints
- `GET /api/client/lawyers` - Get all lawyers
- `GET /api/client/lawyers/search` - Search lawyers with filters
- `POST /api/client/book` - Book appointment with lawyer
- `GET /api/client/appointments` - Get client appointments

### File Upload Endpoints
- `POST /api/upload/photo` - Upload profile photo
- `POST /api/upload/cv` - Upload CV document
- `POST /api/upload/certificate` - Upload bar registration certificate

## 🔧 Configuration

### Email Setup
1. Create Gmail App Password
2. Configure SMTP settings in environment variables
3. Customize email templates in `backend/src/config/email.js`

### AWS S3 Setup
1. Create S3 bucket with appropriate permissions
2. Generate IAM user with S3 access
3. Configure bucket CORS for web uploads
4. Set environment variables for AWS credentials

### Database Configuration
- Development: Local PostgreSQL or Docker
- Production: Neon PostgreSQL (serverless)
- Migrations: Automatic on deployment
- Seeds: Optional sample data

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify database URL format
   - Check network connectivity
   - Ensure database is active

2. **Email Not Working**
   - Verify Gmail app password
   - Check SMTP configuration
   - Test with ethereal email in development

3. **File Upload Issues**
   - Verify AWS credentials
   - Check S3 bucket permissions
   - Monitor file size limits

4. **Authentication Problems**
   - Clear browser cookies/localStorage
   - Verify JWT secret configuration
   - Check token expiration settings

### Debug Commands
```bash
# Check database connection
cd backend && npm run debug

# Test S3 connectivity
cd backend && npm run test:s3

# Verify API health
curl http://localhost:3000/api/health
```

## 📈 Performance & Scalability

### Optimization Features
- **Code Splitting**: React lazy loading for route-based chunks
- **Image Optimization**: WebP format with fallbacks
- **Database Indexing**: Optimized queries with proper indexes
- **Caching**: Redis-ready session management
- **CDN Ready**: Static asset optimization for CDN delivery

### Monitoring
- Server health endpoints for uptime monitoring
- Database query performance tracking
- File upload success/failure rates
- Authentication flow analytics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration for code style
- Write tests for new API endpoints
- Update documentation for new features
- Use conventional commit messages

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/API.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Redux Authentication System](docs/REDUX_AUTH_SYSTEM.md)

### Contact
- **Developer**: Asima
- **Repository**: [GitHub - KanoonWise](https://github.com/asima2006/Kanoonwise)
- **Live Demo**: [kanoonwise-li7v.onrender.com](https://kanoonwise-li7v.onrender.com)

### Issue Reporting
Please use GitHub Issues for bug reports and feature requests. Include:
- Environment details (browser, Node.js version)
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

**Built with ❤️ for the Indian legal community**