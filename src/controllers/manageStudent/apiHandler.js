import { Router } from "express";
import createStudent from "./createStudent.js";
import listStudent from "./listStudent.js";
import listStudentById from "./listStudentById.js";
import deleteStudent from "./deleteStudent.js";
const router = Router();

router.use("/create", createStudent);
router.use("/list", listStudent)
router.use("/listbyid",listStudentById)
router.use("/delete",deleteStudent)

export default router;
