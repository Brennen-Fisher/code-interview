import express from "express";
import { deleteComment, createComment, updateComment, getComment, getComments } from "../controller/comment.controller.js";

const router = express.Router();

router.delete("/:id", deleteComment)
router.post("/createComment", createComment)
router.put("/:id", updateComment)
router.get("/single/:id", getComments)
router.get("/:id", getComment)

export default router;