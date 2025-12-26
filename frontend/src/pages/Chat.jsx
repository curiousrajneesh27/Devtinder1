import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { chatSchema } from "../schemas/chatSchema";
import { useGlobalStore } from "../store/useStore";
import useGetMessages from "../hooks/useGetMessages";
import useConnectSocket from "../hooks/useConnectSocket";
import Messages from "../components/Chat/Messages";
import Loader from "../components/Common/Loader";
import { LuSend } from "react-icons/lu";
import { MdAttachFile } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
    const { user, onlineUsers, typingUsers, connections } = useGlobalStore();
    const { userId } = useParams();
    useGetMessages(userId);
    const { socket, isLoading } = useConnectSocket(userId);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { isValid, errors }
    } = useForm({
        resolver: yupResolver(chatSchema),
        mode: "onChange"
    });

    const messageValue = watch("message");

    // Handle typing indicator
    useEffect(() => {
        if (messageValue && messageValue.length > 0) {
            socket?.emit("typing", { senderId: user?._id, receiverId: userId });

            // Clear existing timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            // Set timeout to stop typing
            typingTimeoutRef.current = setTimeout(() => {
                socket?.emit("stopTyping", { senderId: user?._id, receiverId: userId });
            }, 1000);
        } else {
            socket?.emit("stopTyping", { senderId: user?._id, receiverId: userId });
        }

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [messageValue, socket, user?._id, userId]);

    const onSubmit = async ({ message }) => {
        if (selectedFile) {
            // Handle file upload
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("senderId", user?._id);
            formData.append("receiverId", userId);
            formData.append("messageType", selectedFile.type.startsWith("image/") ? "image" : "file");

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/file/upload`, {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                });
                const data = await response.json();
                socket?.emit("sendMessage", data.data);
                setSelectedFile(null);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            socket?.emit("sendMessage", { senderId: user?._id, receiverId: userId, message });
        }
        reset();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    // Get connection details for online status
    const connection = connections?.find((conn) => 
        String(conn._id) === String(userId) || 
        String(conn.senderId?._id) === String(userId) || 
        String(conn.receiverId?._id) === String(userId)
    );
    
    const isOnline = onlineUsers.includes(userId);
    const isTyping = typingUsers[userId];

    if (isLoading) return <Loader />;

    return (
        <div className="flex-1 flex items-center justify-center px-2 my-5">
            <div className="bg-base-100 p-3 pb-3 rounded-md shadow-lg max-w-xl w-full">
                {/* Online Status Header */}
                <div className="mb-3 pb-2 border-b flex items-center gap-2">
                    <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></div>
                    </div>
                    <span className="text-sm font-medium">
                        {isOnline ? "Online" : "Offline"}
                    </span>
                </div>

                <Messages />

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="text-sm text-gray-500 italic px-2 py-1">
                        typing...
                    </div>
                )}

                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex items-center justify-center gap-3">
                    
                    {selectedFile && (
                        <div className="absolute bottom-20 left-4 bg-gray-100 p-2 rounded-md">
                            <span className="text-sm">{selectedFile.name}</span>
                            <button
                                type="button"
                                onClick={() => setSelectedFile(null)}
                                className="ml-2 text-red-500">
                                ×
                            </button>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 hover:bg-gray-100 rounded-full">
                        <MdAttachFile size={20} />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                        accept="image/*,.pdf,.txt,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.json"
                    />

                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Write a message..."
                            className={`input rounded-md border border-gray-300 focus:outline-none focus:border-primary w-full h-11 ${errors?.message && "border-red-500 focus:border-red-500"}`}
                            {...register("message")}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!isValid && !selectedFile}
                        className="bg-primary disabled:bg-primary/80 p-3 flex items-center justify-center rounded-full">
                        <LuSend />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;

