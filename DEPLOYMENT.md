# Kanoonwise - Complete Deployment Guide

A comprehensive lawyer-client platform with booking, consultation, and profile management features.

## 🚀 Live Deployment

### Prerequisites
- GitHub account with your code pushed
- Render account (or other hosting platform)
- Neon PostgreSQL database (already configured)

### 1. Deploy on Render

#### Method 1: Using render.yaml (Recommended)
1. Go to [Render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `asima2006/Kanoonwise`
4. Render will automatically detect your `render.yaml` configuration
5. Click "Create Web Service"

#### Method 2: Manual Setup
1. Create a new Web Service on Render
2. Connect to your GitHub repository
3. Configure the following settings:
   - **Name**: `kanoonwise-app`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

### 2. Environment Variables

The following environment variables are already configured in `render.yaml`:

```yaml
NODE_ENV: production
DB_URL: [Your Neon PostgreSQL URL]
JWT_SECRET: [Your JWT Secret]
JWT_ACCESS_EXPIRATION: 15m
JWT_REFRESH_EXPIRATION: 7d
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587
SMTP_USER: [Your Gmail]
SMTP_PASS: [Your App Password]
EMAIL_FROM: [Your Email]
SEND_REAL_EMAILS: true
USE_ETHEREAL_EMAIL: false
```

### 3. Database Setup

Your application will automatically:
- Run database migrations on deployment
- Set up all required tables
- (Optional) Seed sample data if `RUN_SEEDS=true`

### 4. Build Process

The deployment process will:
1. Install backend dependencies
2. Install frontend dependencies  
3. Build the React frontend
4. Run database migrations
5. Start the Node.js server

### 5. Verify Deployment

After deployment:
1. Visit your Render app URL
2. Check `/working` endpoint to verify server is running
3. Test user registration and login
4. Verify email functionality

## 🏗️ Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Sequelize
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT with refresh tokens
- **Email**: Nodemailer with Gmail SMTP
- **Hosting**: Render (configured)

## 📦 Project Structure

```
kanoonwise/
├── frontend/          # React application
│   ├── src/
│   ├── public/
│   └── dist/          # Built files (generated)
├── backend/           # Node.js API
│   ├── src/
│   ├── migrations/    # Database migrations
│   ├── seeders/       # Sample data
│   └── deploy.js      # Deployment script
├── render.yaml        # Render deployment config
└── package.json       # Root package.json
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start backend (development)
cd backend && npm run dev

# Start frontend (development)
cd frontend && npm run dev
```

## 🚀 Manual Deployment Commands

If you need to run deployment commands manually:

```bash
# Build the application
npm run build

# Run database migrations
cd backend && npm run db:migrate

# Start production server
npm start
```

## 🔐 Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- JWT authentication
- Password hashing with bcrypt
- Input validation with Joi

## 📧 Email Configuration

The app is configured to send emails using Gmail SMTP:
- Account verification emails
- Password reset emails
- Appointment notifications

## 🎯 Key Features

- **User Management**: Lawyer and client registration/login
- **Profile Management**: Comprehensive profiles for both user types
- **Appointment Booking**: Schedule consultations
- **Reviews System**: Client feedback for lawyers
- **Email Notifications**: Automated email workflows
- **Responsive Design**: Mobile-friendly interface

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Verify Neon database URL is correct
   - Check if database is active in Neon dashboard

2. **Build Failures**
   - Ensure all dependencies are listed in package.json
   - Check Node.js version compatibility

3. **Email Not Working**
   - Verify Gmail app password is correct
   - Check SMTP settings

### Support

For deployment issues:
- Check Render logs in the dashboard
- Verify environment variables are set
- Ensure database migrations ran successfully

## 📄 License

This project is licensed under the ISC License.
