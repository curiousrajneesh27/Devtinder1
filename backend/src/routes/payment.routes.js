import { Router } from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import { createOrder, verifyPayment, getSubscription, getRazorpayKey } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.get("/key", getRazorpayKey);
paymentRouter.post("/create-order", userAuth, createOrder);
paymentRouter.post("/verify", userAuth, verifyPayment);
paymentRouter.get("/subscription", userAuth, getSubscription);

export default paymentRouter;
