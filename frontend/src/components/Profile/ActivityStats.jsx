import { useEffect, useState } from "react";
import { useGlobalStore } from "../../store/useStore";
import { FaEye, FaHeart, FaUsers, FaChartLine } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const ActivityStats = () => {
    const { user, activityStats, setActivityStats } = useGlobalStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivityStats = async () => {
            try {
                const response = await axiosInstance.get("/activity/stats");
                setActivityStats(response.data.data);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch activity stats");
            } finally {
                setLoading(false);
            }
        };

        fetchActivityStats();
    }, [setActivityStats]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const stats = [
        {
            icon: <FaEye className="text-3xl text-blue-500" />,
            label: "Profile Views",
            value: activityStats?.profileViews || 0,
            color: "bg-blue-50"
        },
        {
            icon: <FaHeart className="text-3xl text-pink-500" />,
            label: "Swipes Given",
            value: activityStats?.totalSwipesGiven || 0,
            color: "bg-pink-50"
        },
        {
            icon: <FaChartLine className="text-3xl text-green-500" />,
            label: "Swipes Received",
            value: activityStats?.totalSwipesReceived || 0,
            color: "bg-green-50"
        },
        {
            icon: <FaUsers className="text-3xl text-purple-500" />,
            label: "Total Connections",
            value: activityStats?.totalConnections || 0,
            color: "bg-purple-50"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Activity Stats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.color} rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold">{stat.value}</p>
                            </div>
                            <div>{stat.icon}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Profile Views */}
            {activityStats?.viewedBy && activityStats.viewedBy.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Recent Profile Views</h3>
                    <div className="space-y-3">
                        {activityStats.viewedBy.slice(0, 5).map((view, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={view.userId?.photoUrl}
                                        alt={view.userId?.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">{view.userId?.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(view.viewedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Last Active */}
            {activityStats?.lastActive && (
                <div className="mt-6 text-center text-gray-600">
                    <p>Last Active: {new Date(activityStats.lastActive).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};

export default ActivityStats;
