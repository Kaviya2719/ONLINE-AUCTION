import express from "express";
import { createBid, getAllBids } from "./BidController.js";
import jsontoken from "../JWT/jsontoken.js"; // Adjusted path for jsontoken middleware

const router = express.Router();

router.post("/bid", jsontoken, createBid); // Apply JWT middleware here
router.get("/bids", jsontoken, getAllBids); // Apply JWT middleware here as needed

export default router;
