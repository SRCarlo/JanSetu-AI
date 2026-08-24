import { Router } from "express";

import {
  getDemand,
} from "../controllers/demand.controller.js";

const router = Router();

router.get(
  "/",
  getDemand
);

export default router;