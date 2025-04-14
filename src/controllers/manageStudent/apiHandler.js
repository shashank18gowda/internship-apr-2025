import { Router } from "express";
import createStudent from "./createStudent.js";
import listStudent from "./listStudent.js";
const router = Router();

router.use("/create", createStudent);
router.use("/list",listStudent)
export default router;
