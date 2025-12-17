import { AsyncHandler, ErrorHandler } from "../utils/handlers.js";
import { ReportModel } from "../models/report.model.js";
import { UserModel } from "../models/user.model.js";

// Report a user
const reportUser = AsyncHandler(async (req, res, next) => {
    const { userId: reportedUserId, reason, description } = req.body;
    const reporterId = req.user._id;

    // Validate inputs
    if (!reportedUserId || !reason) {
        throw new ErrorHandler("User ID and reason are required", 400);
    }

    // Check if user exists
    const userExists = await UserModel.findById(reportedUserId);
    if (!userExists) {
        throw new ErrorHandler("User not found", 404);
    }

    // Check if already reported
    const existingReport = await ReportModel.findOne({
        reporterId,
        reportedUserId,
        status: "pending"
    });

    if (existingReport) {
        throw new ErrorHandler("You have already reported this user", 400);
    }

    // Create report
    const report = await ReportModel.create({
        reporterId,
        reportedUserId,
        reason,
        description
    });

    res.status(201).json({
        success: true,
        message: "User reported successfully",
        data: report
    });
});

// Block a user
const blockUser = AsyncHandler(async (req, res, next) => {
    const { userId: blockedUserId } = req.body;
    const currentUserId = req.user._id;

    // Validate input
    if (!blockedUserId) {
        throw new ErrorHandler("User ID is required", 400);
    }

    // Check if blocking yourself
    if (blockedUserId === currentUserId.toString()) {
        throw new ErrorHandler("You cannot block yourself", 400);
    }

    // Check if user exists
    const userToBlock = await UserModel.findById(blockedUserId);
    if (!userToBlock) {
        throw new ErrorHandler("User not found", 404);
    }

    // Add to blocked list
    const user = await UserModel.findById(currentUserId);
    if (user.blockedUsers.includes(blockedUserId)) {
        throw new ErrorHandler("User is already blocked", 400);
    }

    user.blockedUsers.push(blockedUserId);
    await user.save();

    res.status(200).json({
        success: true,
        message: "User blocked successfully"
    });
});

// Unblock a user
const unblockUser = AsyncHandler(async (req, res, next) => {
    const { userId: blockedUserId } = req.body;
    const currentUserId = req.user._id;

    // Validate input
    if (!blockedUserId) {
        throw new ErrorHandler("User ID is required", 400);
    }

    // Remove from blocked list
    const user = await UserModel.findById(currentUserId);
    const index = user.blockedUsers.indexOf(blockedUserId);

    if (index === -1) {
        throw new ErrorHandler("User is not blocked", 400);
    }

    user.blockedUsers.splice(index, 1);
    await user.save();

    res.status(200).json({
        success: true,
        message: "User unblocked successfully"
    });
});

// Get blocked users
const getBlockedUsers = AsyncHandler(async (req, res, next) => {
    const currentUserId = req.user._id;

    const user = await UserModel.findById(currentUserId).populate("blockedUsers", "name photoUrl age about");

    res.status(200).json({
        success: true,
        message: "Blocked users fetched successfully",
        data: user.blockedUsers
    });
});

export { reportUser, blockUser, unblockUser, getBlockedUsers };
