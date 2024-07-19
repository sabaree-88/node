import { Router } from "express";
import {
  viewUser,
  addUser,
  editUser,
  deleteUser,
  getUserID,
} from "../controller/crudController.js";

// assign the Router function to router variable
const router = Router();

// create endpoints to add, edit, update, delete

router.get("/view", viewUser);
router.get("/view/:id", getUserID);
router.post("/add", addUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
