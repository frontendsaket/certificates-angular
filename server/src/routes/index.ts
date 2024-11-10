import { Router } from "express";
import auth from "./auth";
import certificate from "./certificate";


const router = Router();

export default (): Router => {
  auth(router);
  certificate(router);
  return router;
};