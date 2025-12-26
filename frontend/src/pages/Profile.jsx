import EditProfile from "../components/Profile/EditProfile";
import ProfileCard from "../components/Profile/ProfileCard";
import ActivityStats from "../components/Profile/ActivityStats";
import Loader from "../components/Common/Loader";
import { useGlobalStore } from "../store/useStore";
import { useState } from "react";

const Profile = () => {
    const { user } = useGlobalStore();
    const [activeTab, setActiveTab] = useState("profile");

    if (!user) return <Loader />;

    return (
        <div className="flex-1 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Tab Navigation */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`px-6 py-2 rounded-lg font-medium transition ${
                            activeTab === "profile"
                                ? "bg-primary text-white"
                                : "bg-base-200 hover:bg-base-300"
                        }`}>
                        My Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("stats")}
                        className={`px-6 py-2 rounded-lg font-medium transition ${
                            activeTab === "stats"
                                ? "bg-primary text-white"
                                : "bg-base-200 hover:bg-base-300"
                        }`}>
                        Activity Stats
                    </button>
                </div>

                {/* Content */}
                {activeTab === "profile" ? (
                    <div className="flex flex-1 justify-center gap-10 items-center">
                        <EditProfile user={user} />
                        <ProfileCard user={user} />
                    </div>
                ) : (
                    <ActivityStats />
                )}
            </div>
        </div>
    );
};

export default Profile;
