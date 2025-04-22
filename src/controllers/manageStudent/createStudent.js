import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
const router = Router();

import multer from "multer";
import image from "../../middlewares/uploads.js";
import { authenticate } from "../../middlewares/authenticate.js";
const upload = image.single("avatar");

export default router.post("/", authenticate, async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return send(res, setErrMsg(RESPONSE.MULTER_ERR, err));
      } else if (err) {
        return send(res, setErrMsg(RESPONSE.MULTER_ERR, err));
      }

      if (!req.file || req.file == undefined) {
        return send(res, setErrMsg(RESPONSE.MANDATORY, "avatar"));
      }

      const { name, email, rollno } = req.body;

      if (!name || name == undefined) {
        return send(res, setErrMsg(RESPONSE.MANDATORY, "name"));
        // return res.send({ code: "201", message: "name is mandatory" });
      }
      if (!email || email == undefined) {
        return send(res, setErrMsg(RESPONSE.MANDATORY, "email"));
      }
      if (!rollno || rollno == undefined) {
        return send(res, setErrMsg(RESPONSE.MANDATORY, "rollno"));
      }

      let emailPattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

      if (!emailPattern) {
        return send(res, setErrMsg(RESPONSE.INVALID, "email"));
      }

      let isRollNoExist = await studentModel.findOne({
        rollno: rollno,
      });

      if (isRollNoExist != null) {
        return send(res, setErrMsg(RESPONSE.ALRDY_EXST, "rollno"));
      }

      let isEmailExist = await studentModel.findOne({
        email: email,
      });

      if (isEmailExist != null) {
        return send(res, setErrMsg(RESPONSE.ALRDY_EXST, "email"));
      }

      await studentModel.create({
        name: name,
        email: email,
        rollno: rollno,
        image: req.file.filename,
        teacher_id: req.user.id,
      });

      return send(res, RESPONSE.SUCESSS);
    });
  } catch (error) {
    console.log("create student:", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
