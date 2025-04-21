import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import teacherModel from "../../models/teacherModel.js";
const router = Router();
import bcrypt from "bcrypt";
import { STATE } from "../../config/constants.js";
import jwt from "jsonwebtoken";

export default router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || email == undefined) {
      return send(res, setErrMsg(RESPONSE.MANDATORY, "email"));
    }
    if (!password || password == undefined) {
      return send(res, setErrMsg(RESPONSE.MANDATORY, "password"));
    }

    let teacherData = await teacherModel.findOne({
      email: email,
      isactive: STATE.ACTIVE,
    });

    if (teacherData && (await bcrypt.compare(password, teacherData.password))) {
      let token = jwt.sign(
        {
          id: teacherData._id,
          name: teacherData.name,
        },
        process.env.TOKEN_KEY
      );

      return send(res, RESPONSE.SUCESSS, token);
    } else {
      return send(res, setErrMsg(RESPONSE.INVALID, "Login credential"));
    }
  } catch (error) {
    console.log("Login:", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
