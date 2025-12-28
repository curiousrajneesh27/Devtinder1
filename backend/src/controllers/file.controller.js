import { AsyncHandler, ErrorHandler } from "../utils/handlers.js";
import { MessageModel } from "../models/message.model.js";
import { ChatModel } from "../models/chat.model.js";
import { ConnectionRequestModel } from "../models/connectionRequest.model.js";
import { UserModel } from "../models/user.model.js";
import mongoose from "mongoose";

// Upload file in message
export const uploadFile = AsyncHandler(async (req, res) => {
    const { senderId, receiverId, messageType, codeLanguage } = req.body;
    const file = req.file;

    if (!file) {
        throw new ErrorHandler("Please provide a file", 400);
    }

    if (!senderId || !receiverId) {
        throw new ErrorHandler("Please provide sender and receiver id", 400);
    }

    // Check if both users are connected
    const connectionExists = await ConnectionRequestModel.findOne({
        $or: [
            { senderId, receiverId, status: "accepted" },
            { senderId: receiverId, receiverId: senderId, status: "accepted" }
        ]
    });

    if (!connectionExists) {
        throw new ErrorHandler("You are not connected to this user", 400);
    }

    // Check if chat exists
    let chat = await ChatModel.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    if (!chat) {
        chat = await ChatModel.create({
            participants: [senderId, receiverId]
        });
    }

    // Create message with file
    const newMessage = await MessageModel.create({
        senderId,
        receiverId,
        messageType: messageType || "file",
        fileUrl: `/uploads/${file.filename}`,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        codeLanguage: codeLanguage || null,
        message: file.originalname
    });

    // Add message to chat
    chat.messages.push(newMessage._id);
    await chat.save();

    // Populate sender and receiver
    const populatedMessage = await MessageModel.findById(newMessage._id)
        .populate("senderId", "name photoUrl")
        .populate("receiverId", "name photoUrl");

    res.status(201).json(new SuccessHandler("File uploaded successfully", populatedMessage, 201));
});
