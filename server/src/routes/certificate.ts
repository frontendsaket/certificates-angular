import { Router, Response } from "express";

import { getAllCertificates, getCertificateById, createCertificate } from "../controllers/certificateController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/certificate/all").get(fetchuser, (req: any, res: Response)=>getAllCertificates(req, res));
    router.route("/api/certificate/get/:id").get((req: any, res: Response)=>getCertificateById(req, res));
    router.route("/api/certificate/create").post((req: any, res: Response)=>createCertificate(req, res));
}