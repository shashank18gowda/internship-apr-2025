import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { STATE } from "../../config/constants.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { authenticate } from "../../middlewares/authenticate.js";
const router = Router();

export default router.get("/", authenticate, async (req, res) => {
  try {
    // if (!name || name == undefined) {
    //   return send(res, setErrMsg(RESPONSE.MANDATORY, "name"));
    //   // return res.send({ code: "201", message: "name is mandatory" });
    // }

    //find method
    // let studentData = await studentModel.find(
    //   {
    //     isactive: STATE.ACTIVE,
    //   },
    //   {
    //     isactive: 0,
    //     __v: 0,
    //   }
    // );

    //aggregate method
    let studentData = await studentModel.aggregate([
      {
        $match: {
          isactive: STATE.ACTIVE,
          $expr: { $eq: ["$teacher_id", { $toObjectId: req.user.id }] },
        },
      },
      {
        $project: {
          isactive: 0,
          __v: 0,
        },
      },
    ]);

    if (studentData.length == 0) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "student data"));
    }

    studentData = studentData.map((itm) => {
      return {
        ...itm,
        image: itm.image != undefined ? "/uploads/" + itm.image : null,
      };
    });

    return send(res, RESPONSE.SUCESSS, studentData);
  } catch (error) {
    console.log("list student:", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
