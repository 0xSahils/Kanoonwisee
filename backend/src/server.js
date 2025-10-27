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
const stampRoutes = require("./routes/stamp.routes");
const adminStampRoutes = require("./routes/adminStamp.routes");

const app = express();

// --------------------------------------------------
// ✅ 1. Trust proxy (for Render, Railway, etc.)
app.set("trust proxy", 1);

// --------------------------------------------------
// ✅ 2. Security Middlewares
app.use(securityHeaders);
app.use(generalRateLimit);

// --------------------------------------------------
// ✅ 3. Cookie + Session
app.use(cookieParser());
app.use(session(sessionOptions));

// --------------------------------------------------
// ✅ 4. CORS configuration with your Vercel domain
const allowedOrigins = [
  "http://localhost:5173",         // local dev (Vite)
  "http://localhost:3000",         // local fallback
  "https://kanoonwisee.vercel.app", // your live frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// --------------------------------------------------
// ✅ 5. Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// --------------------------------------------------
// ✅ 6. Timeout for file upload routes
app.use("/api/lawyer/profile", (req, res, next) => {
  req.setTimeout(60000);
  res.setTimeout(60000);
  next();
});

// --------------------------------------------------
// ✅ 7. Routes
app.use("/working", (req, res) => {
  res.send("Server is working ✅");
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
app.use("/api/stamps", stampRoutes);
app.use("/api/admin/stamps", adminStampRoutes);

// --------------------------------------------------
// ✅ 8. Redirect all unknown routes to Vercel frontend
app.get("*", (req, res) => {
  const vercelUrl = "https://kanoonwisee.vercel.app";
  return res.redirect(`${vercelUrl}${req.originalUrl}`);
});

// --------------------------------------------------
// ✅ 9. Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

console.log(
  `🚀 Starting server in ${process.env.NODE_ENV || "development"} mode...`
);

// --------------------------------------------------
// ✅ 10. Database + Server Start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // Initialize session store if needed
    if (process.env.NODE_ENV === "production" && sessionOptions.store) {
      console.log("🔄 Initializing session store...");
      try {
        await sessionOptions.store.sync();
        console.log("✅ Session store initialized");
      } catch (sessionError) {
        console.error("⚠️ Session store initialization failed:", sessionError.message);
      }
    }

    const server = app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`🌐 Frontend served from: https://kanoonwisee.vercel.app/`);
    });

    // File upload timeout
    server.timeout = 60000;
    console.log("⏱️ Server timeout set to 60 seconds for uploads");
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
