import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(
      process.env.CLERK_WEBHOOK_SECRET
    );

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const payload = req.rawBody || JSON.stringify(req.body)
    await whook.verify(payload, headers)

    const { type, data } = req.body
    console.log("Clerk webhook event:", type, data)

    const userData = {
      _id: data.id,
      username: [data.first_name, data.last_name].filter(Boolean).join(" ").trim(),
      image: data.image_url || "",
      email:
        data.email_addresses?.[0]?.email_address || data.primary_email_address || "",
    }

    switch (type) {
      case "user.created":
        await User.create(userData)
        break

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, {
          new: true,
          runValidators: true,
        })
        break

      case "user.deleted":
        await User.findByIdAndDelete(data.id)
        break

      default:
        console.log(`Unhandled Clerk webhook event type: ${type}`)
        break
    }

    res.json({
      success: true,
      message: "Webhook processed successfully",
    });

  } catch (error) {
    console.error("Webhook error:", error)

    res.status(400).json({
      success: false,
      message: error.message,
      error: error.stack,
    })
  }
};

export default clerkWebhooks;