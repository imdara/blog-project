// importing modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
config();

// importing routes
import blogsRoute from "./routes/blogs.js";
import usersRoute from "./routes/users.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// implementing routes
app.use("/blogs", blogsRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) =>
  res.send({ statusCode: 200, message: "Server working fine" })
);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(app.listen(PORT, () => console.log("Connected to the database")))
  .catch((err) => console.log(err));
