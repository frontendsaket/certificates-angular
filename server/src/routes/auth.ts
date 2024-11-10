import { Router, Response } from "express";

import { loginUser, verifyLogin, sendOtp } from "../controllers/authController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/auth/login").post((req: any, res: Response)=>loginUser(req, res));
    router.route("/api/auth/verify").get(fetchuser, (req: any, res: Response)=> verifyLogin(req, res));
    router.route("/api/auth/otp").post((req: any, res: Response)=>sendOtp(req, res));
}