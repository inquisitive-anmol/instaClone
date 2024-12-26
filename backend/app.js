require("dotenv").config();

// validate environment variables
try {
    require("./config/validateEnv")();
} catch (error) {
    if(process.env.NODE_ENV !== "production") {
        console.error(error);
    }
    process.exit(1);
}

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const connectDb =  require("./config/db");
const  { errorHandler } = require("./middlewares/errorHandler");
const limiter = require("./middlewares/rateLimiter");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/userRoute");

const app = express();

// connect to the database
const dbConnection = connectDb();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", indexRouter);
app.use("/api/v1/user", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = {
    app,
    dbConnection,
};