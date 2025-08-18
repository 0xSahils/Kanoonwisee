# KanoonWise Frontend

A unified React frontend for the KanoonWise lawyer-client platform, supporting both lawyer and client roles from a single codebase.

## Features

### For Lawyers
- **Dashboard**: View stats, today's consultations, pending requests
- **Profile Management**: Manage specialization, fees, experience, bio
- **Calendar View**: Interactive calendar with appointment management
- **Appointments**: Accept/reject requests, manage consultations
- **Role-specific Navigation**: Lawyer-focused sidebar and navigation

### For Clients  
- **Dashboard**: View upcoming consultations, pending requests
- **Lawyer Search**: Advanced search with filters (specialization, location, fees, rating)
- **Booking System**: Book consultations with selected lawyers
- **Appointment Management**: View and manage booked consultations
- **Reviews**: Post reviews for completed consultations

### Shared Features
- **OTP Authentication**: Secure email-based login for both roles
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark/Light Mode**: Theme toggle support
- **Real-time Notifications**: Toast notifications for user actions
- **Role-based Routing**: Automated redirection based on user role

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React.js 18
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Auth**: JWT stored in localStorage
- **Notifications**: react-hot-toast
- **Calendar**: react-big-calendar
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Setup Instructions

### Prerequisites
- Node.js 20.16.0 or higher
- npm or yarn
- Backend API running on localhost:3000

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your backend API URL:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Authentication Flow

1. User enters email on login page
2. OTP is sent to email via `POST /auth/request-otp`
3. User enters OTP for verification via `POST /auth/verify-otp`
4. JWT token and user info stored in localStorage
5. User redirected to role-specific dashboard:
   - Lawyers → `/lawyer/dashboard`
   - Clients → `/client/dashboard`

## Role-based Access

- **Lawyers**: Access to `/lawyer/*` routes
- **Clients**: Access to `/client/*` routes
- **Auto-redirect**: Users are automatically redirected to appropriate dashboard based on role
- **Route Protection**: `ProtectedRoute` component handles authentication and role-based access

## Project Structure

```
src/
├── api/                    # API layer
├── components/
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── pages/
│   ├── auth/              # Authentication pages
│   ├── lawyer/            # Lawyer-specific pages
│   └── client/            # Client-specific pages
├── store/                 # Redux store
└── lib/                   # Utilities
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

This project is part of the KanoonWise platform.
