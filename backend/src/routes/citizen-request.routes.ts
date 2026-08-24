import { Router } from "express";

import { submitCitizenRequest } from "../controllers/citizen-request.controller.js";

const router = Router();

router.post("/", submitCitizenRequest);

export default router;
