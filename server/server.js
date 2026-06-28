import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import apiRoutes from "./routes/apiRoutes.js";
import clerkWebhooks from "./controller/clerkWebhooks.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

await connectDB();

app.get("/", (req, res) => {
  res.send("API is working...");
});

app.use("/api", apiRoutes);
app.use("/api/clerk", clerkWebhooks);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
