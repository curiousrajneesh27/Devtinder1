import { Router } from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import { reportUser, blockUser, unblockUser, getBlockedUsers } from "../controllers/moderation.controller.js";

const moderationRouter = Router();

moderationRouter.post("/report", userAuth, reportUser);
moderationRouter.post("/block", userAuth, blockUser);
moderationRouter.post("/unblock", userAuth, unblockUser);
moderationRouter.get("/blocked", userAuth, getBlockedUsers);

export default moderationRouter;
