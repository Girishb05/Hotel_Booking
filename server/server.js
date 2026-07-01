import express from "express"
import "dotenv/config.js"
import cors from "cors"
import connectDB from "./config/db.js"
import { clerkMiddleware } from "@clerk/express"
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoutes.js"
import connectCloudinary from "./config/cloudinary.js"
import roomRouter from "./routes/roomRoute.js"
import bookingRouter from "./routes/bookingRoutes.js"

// Connect to DB and Cloudinary (cached after first call on Vercel)
let isConnected = false
const initServices = async () => {
  if (!isConnected) {
    await connectDB()
    connectCloudinary()
    isConnected = true
  }
}

const app = express()
app.use(cors())

// Capture raw request body for webhook signature verification
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8")
  }
}

// Middleware
app.use(express.json({ verify: rawBodySaver }))
app.use(express.urlencoded({ extended: true, verify: rawBodySaver }))

// Initialize services before every request (cached after first call)
app.use(async (req, res, next) => {
  try {
    await initServices()
    next()
  } catch (err) {
    console.error("Service initialization error:", err)
    res.status(500).json({ error: "Failed to initialize services", details: err.message })
  }
})

// API to listen to the webhook events from Clerk
app.post("/api/clerk", clerkWebhooks)

// Apply Clerk auth middleware after the webhook route
app.use(clerkMiddleware())

app.get("/", (req, res) => {
  res.send("API is working!")
})

app.use("/api/user", userRouter)

app.use("/api/hotel", hotelRouter)
app.use("/api/hotels", hotelRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/bookings", bookingRouter)

// Only start local server when NOT on Vercel
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

export default app