import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        plan: {
            type: String,
            enum: ["free", "premium", "gold"],
            default: "free"
        },
        amount: {
            type: Number,
            required: true
        },
        razorpayOrderId: {
            type: String,
            required: true
        },
        razorpayPaymentId: {
            type: String
        },
        razorpaySignature: {
            type: String
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending"
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);
