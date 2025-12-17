import { Router } from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import { getActivityStats, trackProfileView, updateOnlineStatus, getProfileViewers } from "../controllers/activity.controller.js";

const activityRouter = Router();

activityRouter.get("/stats", userAuth, getActivityStats);
activityRouter.post("/view/:userId", userAuth, trackProfileView);
activityRouter.post("/online", userAuth, updateOnlineStatus);
activityRouter.get("/viewers", userAuth, getProfileViewers);

export default activityRouter;
