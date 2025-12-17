import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        profileViews: {
            type: Number,
            default: 0
        },
        totalSwipesGiven: {
            type: Number,
            default: 0
        },
        totalSwipesReceived: {
            type: Number,
            default: 0
        },
        totalConnections: {
            type: Number,
            default: 0
        },
        lastActive: {
            type: Date,
            default: Date.now
        },
        isOnline: {
            type: Boolean,
            default: false
        },
        viewedBy: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                viewedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

// Index for faster queries
activitySchema.index({ userId: 1 });
activitySchema.index({ lastActive: -1 });

export const ActivityModel = mongoose.model("Activity", activitySchema);
