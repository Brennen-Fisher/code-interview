import express from "express";
import { updateReview, createReview, deleteReview, getReviews, getReview} from "../controller/review.controller.js";

const router = express.Router();

router.delete("/:id", deleteReview)
router.post("/createReview", createReview)
router.put("/:id", updateReview)
router.get("/:id", getReviews)
router.get("/single/:id", getReview)

export default router;