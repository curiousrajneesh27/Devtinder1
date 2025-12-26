import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdReport, MdBlock } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const ReportBlockModal = ({ userId, userName, onClose }) => {
    const [action, setAction] = useState(null); // 'report' or 'block'
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (action === "report") {
                await axiosInstance.post("/moderation/report", {
                    reportedUserId: userId,
                    reason: data.reason,
                    description: data.description
                });
                toast.success("User reported successfully");
            } else if (action === "block") {
                await axiosInstance.post("/moderation/block", {
                    blockedUserId: userId
                });
                toast.success("User blocked successfully");
            }
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    if (!action) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-xl font-bold mb-4">Report or Block {userName}?</h3>
                    <div className="space-y-3">
                        <button
                            onClick={() => setAction("report")}
                            className="w-full flex items-center gap-3 p-4 border rounded-lg hover:bg-red-50 transition">
                            <MdReport className="text-2xl text-red-500" />
                            <div className="text-left">
                                <p className="font-semibold">Report User</p>
                                <p className="text-sm text-gray-600">Report inappropriate behavior</p>
                            </div>
                        </button>
                        <button
                            onClick={() => setAction("block")}
                            className="w-full flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-100 transition">
                            <MdBlock className="text-2xl text-gray-700" />
                            <div className="text-left">
                                <p className="font-semibold">Block User</p>
                                <p className="text-sm text-gray-600">Prevent them from contacting you</p>
                            </div>
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full mt-4 p-2 border rounded-lg hover:bg-gray-100">
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    if (action === "report") {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-xl font-bold mb-4">Report {userName}</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Reason *</label>
                            <select
                                {...register("reason", { required: "Please select a reason" })}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                                <option value="">Select a reason</option>
                                <option value="inappropriate_content">Inappropriate Content</option>
                                <option value="harassment">Harassment</option>
                                <option value="spam">Spam</option>
                                <option value="fake_profile">Fake Profile</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.reason && (
                                <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                            <textarea
                                {...register("description", { maxLength: 500 })}
                                rows="4"
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Provide additional details..."></textarea>
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setAction(null)}
                                className="flex-1 p-2 border rounded-lg hover:bg-gray-100">
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50">
                                {isSubmitting ? "Reporting..." : "Submit Report"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    if (action === "block") {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-xl font-bold mb-4">Block {userName}?</h3>
                    <p className="text-gray-600 mb-6">
                        This user will no longer be able to send you messages or see your profile.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setAction(null)}
                            className="flex-1 p-2 border rounded-lg hover:bg-gray-100">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="flex-1 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:opacity-50">
                            {isSubmitting ? "Blocking..." : "Block User"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default ReportBlockModal;
