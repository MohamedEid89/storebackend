const express = require("express");
// Env Import
const dotenv = require("dotenv");
// Middleware Logger
const morgan = require("morgan");
// Define config path
dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");

// DB Connection
dbConnection();

// Define Express app
const app = express();

// Middleware inviroments
app.use(express.json());
const INV = process.env.NODE_ENV;
if (INV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${INV}`);
}
// Lesting Port
const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

app.all("*", (req, res, next) => {
  // Create Error and send to error Handlning middleware
  // const err = new Error(`Can't find this routes : ${req.originalUrl}`);
  // next(err.message);
  // Ex: next(new ApiError("message", statusCode));
  next(new ApiError(`Can't find this routes : ${req.originalUrl}`, 400));
});

// Global Error handling middleware
app.use(globalError);

// Events => Handling Rejection outside Express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejectionError: ${err.name} | ${err.message}`);
  server.close(() => {
    process.exit(1);
    console.log(`Shutting down...`);
  });
});
