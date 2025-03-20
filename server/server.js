require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Express
const app = express();

// MongoDB
require("./config/mongo.config");

// Middleware
<<<<<<< HEAD
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
=======
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
>>>>>>> main
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.config")(passport);

//Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
const bookRoutes = require("./routes/book.routes");
const commentRoutes = require("./routes/comment.routes");
const userRoutes = require("./routes/user.routes");

bookRoutes("/api/books", app);
commentRoutes("/api/comments", app);
userRoutes("/api/users", app);

// Listener
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
