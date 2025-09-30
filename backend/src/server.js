// Load dotenv only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const sequelize = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");

// Security configurations
const {
  securityHeaders,
  generalRateLimit,
  corsOptions,
  cookieParserOptions,
  sessionOptions
} = require("./config/security");

const authRoutes = require("./routes/auth.routes");
const lawyerRoutes = require("./routes/lawyer.routes");
const clientRoutes = require("./routes/client.routes");
const appointmentRoutes = require("./routes/appointments.routes");
const reviewRoutes = require("./routes/review.routes");
const publicRoutes = require("./routes/public.routes");
const fileUploadRoutes = require("./routes/fileUpload.routes");
const healthRoutes = require("./routes/health.routes");
const adminRoutes = require("./routes/admin.routes");
const paymentRoutes = require("./routes/payment.routes");
const publicPaymentRoutes = require("./routes/publicPayment");

const app = express();

// Security Middlewares
app.use(securityHeaders);
app.use(generalRateLimit);

// Cookie parser for handling httpOnly cookies
app.use(cookieParser());

// Session middleware for CSRF protection
app.use(session(sessionOptions));

// CORS configuration with credentials support
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Increase timeout for file upload requests
app.use('/api/lawyer/profile', (req, res, next) => {
  // Set timeout to 60 seconds for file upload
  req.setTimeout(60000);
  res.setTimeout(60000);
  next();
});

// Serve static files from React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
}

// Routes
app.use("/working", (req, res) => {
  res.send("Server is working");
});
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lawyer", lawyerRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/files", fileUploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/public-payment", publicPaymentRoutes);


// Catch-all handler: send back React's index.html file in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

console.log(
  `Starting server in ${process.env.NODE_ENV || "development"} mode...`
);
console.log(
  `Frontend static files path: ${path.join(__dirname, "../../frontend/dist")}`
);

async function startServer() {
  try {
    // Test database connection without forcing sync
    await sequelize.authenticate();
    console.log("✅ Database connection established");
    
    // Initialize session store if in production
    if (process.env.NODE_ENV === 'production' && sessionOptions.store) {
      console.log("🔄 Initializing session store...");
      try {
        await sessionOptions.store.sync();
        console.log("✅ Session store initialized");
      } catch (sessionError) {
        console.error("⚠️ Session store initialization failed:", sessionError.message);
        // Don't fail the server startup for session store issues
        console.log("⚠️ Continuing without session store - sessions will use memory store");
      }
    }
    
    const server = app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
      if (process.env.NODE_ENV === "production") {
        console.log(
          `📁 Serving static files from: ${path.join(
            __dirname,
            "../../frontend/dist"
          )}`
        );
      }
    });
    
    // Set server timeout to 60 seconds for file uploads
    server.timeout = 60000;
    console.log("⏱️  Server timeout set to 60 seconds for file uploads");
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
