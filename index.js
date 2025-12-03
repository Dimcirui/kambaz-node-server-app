import express from 'express'
import mongoose from 'mongoose'
import Hello from './Hello.js'
import Lab5 from './Lab5/index.js'
import cors from 'cors'
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from './Kambaz/Assignments/routes.js';
// import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js';
import MongoStore from 'connect-mongo';

import "dotenv/config";
import session from "express-session";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: CONNECTION_STRING,
    collectionName: 'sessions'
  }),
};

if (process.env.NODE_ENV === "production" || process.env.SERVER_ENV === "production") {
  console.log("Setting session cookie for production environment");

  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  };
} else {
  console.log("Warning: No cross-site cookie settings detected. If deploying remotely, please check SERVER_ENV variable.");
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app, db);
CourseRoutes(app, db);
ModuleRoutes(app, db);
AssignmentsRoutes(app, db);
// EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);