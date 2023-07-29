import express from "express";
import { deleteUser } from "../controller/user.controller.js";

const router = express.Router();

router.delete("/delete", deleteUser)
// todo get comments get reviews

export default router;