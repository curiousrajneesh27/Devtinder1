import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useGlobalStore } from "../store/useStore";
import notificationSound from "../assets/sounds/notification.mp3";

const useConnectSocket = (userId) => {
    const { user, updateMessages, addOnlineUser, removeOnlineUser, setTyping } = useGlobalStore();
    const [socket, setSocket] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const recentlyPlayed = useRef(false);

    useEffect(() => {
        if (socket) return;

        const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
            withCredentials: true
        });
        setSocket(newSocket);

        // Emit userOnline when connected
        if (user?._id) {
            newSocket.emit("userOnline", user._id);
        }

        // Listen for user status changes
        newSocket.on("userStatusChanged", ({ userId: onlineUserId, isOnline }) => {
            if (isOnline) {
                addOnlineUser(onlineUserId);
            } else {
                removeOnlineUser(onlineUserId);
            }
        });

        return () => {
            newSocket.close();
            setSocket(null);
        };
    }, [user?._id]);

    useEffect(() => {
        if (!socket || !user?._id || !userId) return;

        socket.emit("joinChat", { name: user?.name, senderId: user?._id, receiverId: userId });

        socket.on("error", (errMessage) => {
            toast.error(errMessage);
            setIsLoading(true);
            setTimeout(() => navigate("/feed", { replace: true }), 1000);
        });

        socket.on("messageReceived", (newMessage) => {
            updateMessages(newMessage);
            if (!recentlyPlayed.current && newMessage?.senderId?._id !== user?._id) {
                const sound = new Audio(notificationSound);
                sound.play();
                recentlyPlayed.current = true;
                setTimeout(() => {
                    recentlyPlayed.current = false;
                }, 300);

                // Show browser notification if supported
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("New Message", {
                        body: `${newMessage.senderId.name}: ${newMessage.message || "Sent a file"}`,
                        icon: newMessage.senderId.photoUrl
                    });
                }
            }
        });

        // Listen for typing indicators
        socket.on("userTyping", ({ userId: typingUserId, isTyping }) => {
            setTyping(typingUserId, isTyping);
        });

        return () => {
            socket.off("error");
            socket.off("messageReceived");
            socket.off("userTyping");
        };
    }, [socket, user?._id, user?.name, userId, navigate, updateMessages, setTyping]);

    return { socket, isLoading };
};

export default useConnectSocket;
