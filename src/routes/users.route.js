import { Router } from "express";
// import pool from '../db.config.js';
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";
import { validateUserInfo } from "../middleware/users.middleware.js";

const router = Router();

router
  .get("/", getAllUsers)
  .get("/:id", getSingleUser)
  .post("/", validateUserInfo, createUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

export default router;
