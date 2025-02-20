console.log("Server started");

// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Middleware
const User = require("./models/user.model");
const Book = require("./models/book.model");
const Comment = require("./models/comment.model");
