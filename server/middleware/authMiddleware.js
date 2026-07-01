// import User from "../models/userModel.js";

// export const protect = async (req, res, next) => {
// const {userId} = req.auth;

// if (!userId) {
//     res.json({success: false, message: "User not authenticated"});
//   }
//   else{
//     const user =await User.findById(userId);
//     req.user = user;
//     next(); 
//   }
// }


import User from "../models/user.js";
import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/express";

export const protect = async (req, res, next) => {
    try {
        const auth = getAuth(req);
        const userId = auth?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        let user = await User.findById(userId);

        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId);
            const primaryEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "";
            const firstName = clerkUser.firstName || "";
            const lastName = clerkUser.lastName || "";

            user = await User.create({
                _id: userId,
                username: `${firstName} ${lastName}`.trim() || primaryEmail.split("@")[0],
                image: clerkUser.imageUrl || "",
                email: primaryEmail,
                role: "user",
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};