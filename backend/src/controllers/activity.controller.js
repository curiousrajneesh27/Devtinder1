import { AsyncHandler, ErrorHandler } from "../utils/handlers.js";
import { ActivityModel } from "../models/activity.model.js";
import { UserModel } from "../models/user.model.js";

// Get user activity stats
const getActivityStats = AsyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    let activity = await ActivityModel.findOne({ userId });

    // Create activity record if doesn't exist
    if (!activity) {
        activity = await ActivityModel.create({ userId });
    }

    res.status(200).json({
        success: true,
        message: "Activity stats fetched successfully",
        data: activity
    });
});

// Track profile view
const trackProfileView = AsyncHandler(async (req, res, next) => {
    const viewerId = req.user._id;
    const { userId: profileUserId } = req.params;

    // Don't track own profile views
    if (viewerId.toString() === profileUserId) {
        return res.status(200).json({
            success: true,
            message: "Own profile view, not tracked"
        });
    }

    // Find or create activity for the profile being viewed
    let activity = await ActivityModel.findOne({ userId: profileUserId });
    if (!activity) {
        activity = await ActivityModel.create({ userId: profileUserId });
    }

    // Check if already viewed by this user recently (within 24 hours)
    const existingView = activity.viewedBy.find(
        (view) => view.userId.toString() === viewerId.toString() && Date.now() - view.viewedAt.getTime() < 24 * 60 * 60 * 1000
    );

    if (!existingView) {
        activity.profileViews += 1;
        activity.viewedBy.push({
            userId: viewerId,
            viewedAt: new Date()
        });
        await activity.save();
    }

    res.status(200).json({
        success: true,
        message: "Profile view tracked successfully"
    });
});

// Update online status
const updateOnlineStatus = AsyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { isOnline } = req.body;

    let activity = await ActivityModel.findOne({ userId });
    if (!activity) {
        activity = await ActivityModel.create({ userId });
    }

    activity.isOnline = isOnline;
    activity.lastActive = new Date();
    await activity.save();

    res.status(200).json({
        success: true,
        message: "Online status updated",
        data: {
            isOnline: activity.isOnline,
            lastActive: activity.lastActive
        }
    });
});

// Get who viewed my profile
const getProfileViewers = AsyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const user = req.user;

    // Check if user has premium/gold subscription
    if (user.subscriptionPlan === "free") {
        throw new ErrorHandler("This feature is only available for Premium/Gold members", 403);
    }

    let activity = await ActivityModel.findOne({ userId }).populate("viewedBy.userId", "name photoUrl age about");

    if (!activity) {
        activity = await ActivityModel.create({ userId });
    }

    // Get last 50 viewers
    const viewers = activity.viewedBy.sort((a, b) => b.viewedAt - a.viewedAt).slice(0, 50);

    res.status(200).json({
        success: true,
        message: "Profile viewers fetched successfully",
        data: viewers
    });
});

// Increment swipe count
const incrementSwipeCount = async (userId, type) => {
    let activity = await ActivityModel.findOne({ userId });
    if (!activity) {
        activity = await ActivityModel.create({ userId });
    }

    if (type === "given") {
        activity.totalSwipesGiven += 1;
    } else if (type === "received") {
        activity.totalSwipesReceived += 1;
    }

    activity.lastActive = new Date();
    await activity.save();
};

// Increment connection count
const incrementConnectionCount = async (userId) => {
    let activity = await ActivityModel.findOne({ userId });
    if (!activity) {
        activity = await ActivityModel.create({ userId });
    }

    activity.totalConnections += 1;
    activity.lastActive = new Date();
    await activity.save();
};

export { getActivityStats, trackProfileView, updateOnlineStatus, getProfileViewers, incrementSwipeCount, incrementConnectionCount };
