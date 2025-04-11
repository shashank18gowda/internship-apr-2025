import { Router } from "express";
import createStudent from "./createStudent.js";
const router = Router();

router.use("/create", createStudent);

export default router;
