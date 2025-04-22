import jwt from "jsonwebtoken";
import { send, setErrMsg } from "../helper/responseHelper.js";
import { RESPONSE } from "../config/global.js";

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return send(res, RESPONSE.ACCESS_DENIED);
  }

  try {
    var decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return send(res, setErrMsg(RESPONSE.INVALID, "Token"));
  }

  return next();
};
