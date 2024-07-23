import { Router } from "express";
import {
  viewUser,
  addUser,
  editUser,
  deleteUser,
  getUserID,
} from "../controller/crudController.js";
import requireAuth from "../middleware/authMiddleware.js";
import requireAdmin from "../middleware/reqireAdmin.js";

// assign the Router function to router variable
const router = Router();

// use the requireAuth, this ensures if the token is not present it will not allow to access these below routes
router.use(requireAuth);

// create endpoints to add, edit, update, delete
router.get("/view", viewUser);
// this ensure only admin access these routes
router.get("/view/:id", requireAdmin, getUserID);
router.post("/add", requireAdmin, addUser);
router.put("/edit/:id", requireAdmin, editUser);
router.delete("/delete/:id", requireAdmin, deleteUser);

export default router;
