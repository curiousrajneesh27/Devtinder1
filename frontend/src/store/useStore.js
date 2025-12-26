import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const useGlobalStore = create(
    devtools(
        persist(
            (set) => ({
                // States
                user: null,
                feed: [],
                requests: [],
                connections: [],
                messages: [],
                onlineUsers: [],
                typingUsers: {},
                activityStats: null,

                // Actions
                addUser: (userData) => set({ user: userData }),
                clearUser: () => {
                    set({ user: null });
                    localStorage.removeItem("devtinder_userInfo");
                },

                addFeed: (feedData) => set({ feed: feedData }),
                updateFeed: (userId) => set((state) => ({ feed: state.feed.filter((u) => String(u._id) !== String(userId)) })),
                clearFeed: () => set({ feed: [] }),

                addRequests: (requestsData) => set({ requests: requestsData }),
                updateRequests: (requestId) => set((state) => ({ requests: state.requests?.filter((r) => String(r._id) !== requestId) })),
                clearRequests: () => set({ requests: [] }),

                addConnections: (connectionsData) => set({ connections: connectionsData }),
                clearConnections: () => set({ connections: [] }),

                addMessages: (messagesData) => set({ messages: messagesData }),
                updateMessages: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage] })),
                clearMessages: () => set({ messages: [] }),

                // Online users
                setOnlineUsers: (users) => set({ onlineUsers: users }),
                addOnlineUser: (userId) =>
                    set((state) => ({
                        onlineUsers: [...new Set([...state.onlineUsers, userId])]
                    })),
                removeOnlineUser: (userId) =>
                    set((state) => ({
                        onlineUsers: state.onlineUsers.filter((id) => id !== userId)
                    })),

                // Typing indicators
                setTyping: (userId, isTyping) =>
                    set((state) => ({
                        typingUsers: { ...state.typingUsers, [userId]: isTyping }
                    })),

                // Activity stats
                setActivityStats: (stats) => set({ activityStats: stats })
            }),
            {
                name: "devtinder_userInfo",
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({ user: state.user })
            }
        )
    )
);
