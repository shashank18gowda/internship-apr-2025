import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { STATE } from "../../config/constants.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
const router = Router();

export default router.get("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;

    if (!student_id || student_id == undefined) {
      return send(res, setErrMsg(RESPONSE.MANDATORY, "student_id"));
    }

    //findOne method
    let studentData = await studentModel.findOne(
      {
        _id: student_id,
        isactive: STATE.ACTIVE,
      },
      {
        isactive: 0,
        __v: 0,
      }
    );

    if (studentData == null) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "student data"));
    }

    return send(res, RESPONSE.SUCESSS, studentData);
  } catch (error) {
    console.log("list student by id: ",error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
