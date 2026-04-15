import Router from "express";
import { matchResume } from "../controllers/matchResume.controller.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = Router();

router.post("/match", upload.single("resume"), matchResume);

export default router;