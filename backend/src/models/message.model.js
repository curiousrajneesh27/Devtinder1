import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide the sender id"]
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide the receiver id"]
        },
        message: {
            type: String,
            trim: true
        },
        messageType: {
            type: String,
            enum: ["text", "image", "file", "code"],
            default: "text"
        },
        fileUrl: {
            type: String,
            trim: true
        },
        fileName: {
            type: String,
            trim: true
        },
        fileSize: {
            type: Number
        },
        mimeType: {
            type: String,
            trim: true
        },
        codeLanguage: {
            type: String,
            trim: true
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true, versionKey: false }
);

export const MessageModel = mongoose.model("Message", messageSchema);
