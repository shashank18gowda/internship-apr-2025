import { Router } from "express";
import studentModel from "../../models/studentModel.js";
const router = Router();

export default router.post("/", async (req, res) => {
  try {
    const { name, email, rollno } = req.body;

    console.log(req.body);

    return res.send({ message: "OK" });
    // await studentModel.create({
    //   name,
    //   email,
    //   rollno,
    // });
  } catch (error) {
    console.log(error);
  }
});
