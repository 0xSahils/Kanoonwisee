# Kanoonwise Backend

This is the backend for the Kanoonwise platform, a service for lawyers.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- AWS S3 Bucket and credentials
- Email provider (like SendGrid or AWS SES) credentials

## Local Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd kanoonwise_backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory by copying the example:
    ```bash
    cp .env.example .env
    ```
    Fill in the required values in the `.env` file.

4.  **Set up the database:**
    Make sure your PostgreSQL server is running.
    Run the migrations to create the database tables:
    ```bash
    npm run db:migrate
    ```

5.  **Seed the database (optional):**
    To populate the database with sample data:
    ```bash
    npm run db:seed:all
    ```

6.  **Start the server:**
    For development with auto-reloading:
    ```bash
    npm run dev
    ```
    For production:
    ```bash
    npm start
    ```
    The server will be running on the port specified in your `.env` file (default is 3000).

## API Endpoints

A Postman collection is provided (`Kanoonwise.postman_collection.json`) to test the API endpoints.

### Authentication
- `POST /auth/request-otp`
- `POST /auth/verify-otp`

### Lawyer Profile
- `GET /lawyer/profile`
- `POST /lawyer/profile`

### Appointments
- `GET /lawyer/appointments`
- `POST /lawyer/appointments/respond`

## Production Deployment

1.  Ensure all environment variables in the `.env` file are set for the production environment.
2.  Build the application (if a build step is necessary).
3.  Run database migrations: `npm run db:migrate`.
4.  Start the server: `npm start`.

It is recommended to use a process manager like PM2 to run the application in production.
```
pm2 start src/server.js --name kanoonwise-backend
```
