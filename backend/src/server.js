// Load dotenv only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const sequelize = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth.routes");
const lawyerRoutes = require("./routes/lawyer.routes");
const clientRoutes = require("./routes/client.routes");
const reviewRoutes = require("./routes/review.routes");
const publicRoutes = require("./routes/public.routes");

const app = express();

// Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for React app
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration for development and production
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL || true
      : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
}

// Routes
app.use("/working", (req, res) => {
  res.send("Server is working");
});
app.use("/api/auth", authRoutes);
app.use("/api/lawyer", lawyerRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/public", publicRoutes);

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

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
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
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
