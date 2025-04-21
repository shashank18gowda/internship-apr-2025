import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { STATE } from "../../config/constants.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
const router = Router();

export default router.put("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;

    if (!student_id || student_id == undefined) {
      return send(res, setErrMsg(RESPONSE.MANDATORY, "student_id"));
    }
    const { name, email } = req.body;

    let updates = {};

    if (name && name != undefined) {
      updates.name = name;
    }
    if (email && email != undefined) {
      let emailPattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

      if (!emailPattern) {
        return send(res, setErrMsg(RESPONSE.INVALID, "email"));
      }

      let isEmailExist = await studentModel.findOne({
        email: email,
      });

      if (isEmailExist != null) {
        return send(res, setErrMsg(RESPONSE.ALRDY_EXST, "email"));
      }
      updates.email = email;
    }

    await studentModel.updateOne(
      {
        _id: student_id,
        isactive: STATE.ACTIVE,
      },
      { $set: updates }
    );

    return send(res, RESPONSE.SUCESSS);
  } catch (error) {
    console.log("edit student ", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
