import Razorpay from "razorpay";
import crypto from "crypto";
import { AsyncHandler, ErrorHandler } from "../utils/handlers.js";
import { SubscriptionModel } from "../models/subscription.model.js";
import { UserModel } from "../models/user.model.js";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../config/config.js";
import { sendSubscriptionEmail } from "../utils/emailService.js";

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
});

// Create order for subscription
const createOrder = AsyncHandler(async (req, res, next) => {
    const { plan, amount } = req.body;
    const userId = req.user._id;

    // Validate plan
    if (!["premium", "gold"].includes(plan)) {
        throw new ErrorHandler("Invalid subscription plan", 400);
    }

    // Validate amount
    if (!amount || amount <= 0) {
        throw new ErrorHandler("Invalid amount", 400);
    }

    // Create Razorpay order
    const options = {
        amount: amount * 100, // amount in paisa
        currency: "INR",
        receipt: `order_${Date.now()}`,
        notes: {
            userId: userId.toString(),
            plan
        }
    };

    const order = await razorpay.orders.create(options);

    // Save subscription details
    const subscription = await SubscriptionModel.create({
        userId,
        plan,
        amount,
        razorpayOrderId: order.id,
        status: "pending"
    });

    res.status(200).json({
        success: true,
        message: "Order created successfully",
        data: {
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            subscriptionId: subscription._id
        }
    });
});

// Verify payment signature
const verifyPayment = AsyncHandler(async (req, res, next) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, subscriptionId } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !subscriptionId) {
        throw new ErrorHandler("Missing payment details", 400);
    }

    // Verify signature
    const generatedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");

    if (generatedSignature !== razorpaySignature) {
        throw new ErrorHandler("Invalid payment signature", 400);
    }

    // Find subscription
    const subscription = await SubscriptionModel.findById(subscriptionId);
    if (!subscription) {
        throw new ErrorHandler("Subscription not found", 404);
    }

    if (subscription.userId.toString() !== userId.toString()) {
        throw new ErrorHandler("Unauthorized access", 403);
    }

    // Calculate subscription period
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    // Update subscription
    subscription.razorpayPaymentId = razorpayPaymentId;
    subscription.razorpaySignature = razorpaySignature;
    subscription.status = "completed";
    subscription.startDate = startDate;
    subscription.endDate = endDate;
    await subscription.save();

    // Update user's subscription status
    const user = await UserModel.findById(userId);
    user.subscriptionPlan = subscription.plan;
    user.subscriptionEndDate = endDate;
    await user.save();

    // Send subscription confirmation email (async, non-blocking)
    sendSubscriptionEmail(user.email, user.name, subscription.plan, endDate).catch((err) => console.error("Failed to send subscription email:", err));

    res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: {
            plan: subscription.plan,
            startDate: subscription.startDate,
            endDate: subscription.endDate
        }
    });
});

// Get subscription details
const getSubscription = AsyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    const subscription = await SubscriptionModel.findOne({
        userId,
        status: "completed"
    }).sort({ createdAt: -1 });

    if (!subscription) {
        return res.status(200).json({
            success: true,
            message: "No active subscription found",
            data: null
        });
    }

    res.status(200).json({
        success: true,
        message: "Subscription fetched successfully",
        data: subscription
    });
});

// Get Razorpay key
const getRazorpayKey = AsyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: {
            key: RAZORPAY_KEY_ID
        }
    });
});

export { createOrder, verifyPayment, getSubscription, getRazorpayKey };
