import { Router } from "express";
import { seedAllData } from "../controller/seedController.js";
import {
  createUser,
  createHotel,
  createRoom,
  createBooking,
  getUsers,
  getHotels,
  getRooms,
  getBookings,
} from "../controller/dataController.js";
import { pingDB, getDBInfo } from "../configs/db.js";

const router = Router();

router.get("/health", async (req, res) => {
  const ping = await pingDB();
  res.json(ping);
});

router.get("/db-info", async (req, res) => {
  const info = await getDBInfo();
  res.json(info);
});

router.post("/seed-data", seedAllData);

router.post("/users", createUser);
router.get("/users", getUsers);

router.post("/hotels", createHotel);
router.get("/hotels", getHotels);

router.post("/rooms", createRoom);
router.get("/rooms", getRooms);

router.post("/bookings", createBooking);
router.get("/bookings", getBookings);

export default router;
