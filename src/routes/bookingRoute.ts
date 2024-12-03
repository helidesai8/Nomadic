// Author: Meer Patel 
import express from "express"
import bookingController from "../controllers/bookings"
const router = express.Router()

router.get("/booking", bookingController.getbookings)
router.get("/booking/:id", bookingController.getbookingsOfUser)
router.post("/booking", bookingController.createBooking)
router.patch("/booking/:id", bookingController.updateBooking)



export default router;