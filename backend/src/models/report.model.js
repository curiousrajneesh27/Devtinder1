import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        reporterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        reportedUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        reason: {
            type: String,
            enum: ["inappropriate_content", "harassment", "spam", "fake_profile", "other"],
            required: true
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500
        },
        status: {
            type: String,
            enum: ["pending", "reviewed", "resolved"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

export const ReportModel = mongoose.model("Report", reportSchema);
