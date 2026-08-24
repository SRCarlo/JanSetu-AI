import { Router } from "express";
import {
  getCitizenRequests,
} from "../controllers/request.controller.js";

const router = Router();

router.get(
  "/",
  getCitizenRequests
);

export default router;