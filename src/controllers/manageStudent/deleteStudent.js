import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { STATE } from "../../config/constants.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
const router = Router();

export default router.delete("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;

    if (!student_id || student_id == undefined) {
      return send(res, setErrMsg(RESPONSE.MANDATORY, "student_id"));
    }

    //findOne method
    let studentData = await studentModel.findOne({
      _id: student_id,
      isactive: STATE.ACTIVE,
    });

    if (studentData == null) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "student data"));
    }

    await studentModel.updateOne(
      {
        _id: student_id,
        isactive: STATE.ACTIVE,
      },
      { $set: { isactive: STATE.INACTIVE } }
    );

    // await studentModel.deleteOne({
    //   _id: student_id,
    //   isactive: STATE.ACTIVE,
    // });

    return send(res, RESPONSE.SUCESSS);
  } catch (error) {
    console.log("delete student ", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
