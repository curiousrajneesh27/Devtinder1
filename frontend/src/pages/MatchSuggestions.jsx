import { useGlobalStore } from "../store/useStore";
import useGetMatchSuggestions from "../hooks/useGetMatchSuggestions";
import UserCard from "../components/Cards/UserCard";
import Loader from "../components/Common/Loader";
import { FaHeart, FaStar } from "react-icons/fa";

const MatchSuggestions = () => {
    const { user } = useGlobalStore();
    const { suggestions, loading } = useGetMatchSuggestions();

    if (loading) return <Loader />;

    if (suggestions.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center px-2 my-5">
                <div className="text-center">
                    <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Matches Yet</h2>
                    <p className="text-gray-600">
                        Add more skills to your profile to get better match suggestions!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FaStar className="text-yellow-500 text-3xl" />
                        <h1 className="text-3xl font-bold">Daily Match Suggestions</h1>
                        <FaStar className="text-yellow-500 text-3xl" />
                    </div>
                    <p className="text-gray-600">
                        These developers share similar interests and skills with you!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion._id}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-center mb-4">
                                <img
                                    src={suggestion.photoUrl}
                                    alt={suggestion.name}
                                    className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                                />
                                <h3 className="text-xl font-bold">{suggestion.name}</h3>
                                <p className="text-gray-600">{suggestion.age} years old</p>
                                {suggestion.matchScore && (
                                    <div className="mt-2">
                                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                            {suggestion.matchScore} matching skills
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-700 text-sm mb-2">{suggestion.about}</p>
                            </div>

                            {suggestion.skills && suggestion.skills.length > 0 && (
                                <div className="mb-4">
                                    <p className="font-semibold mb-2 text-sm">Skills:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestion.skills.slice(0, 5).map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                        {suggestion.skills.length > 5 && (
                                            <span className="text-xs text-gray-500">
                                                +{suggestion.skills.length - 5} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    /* Add logic to send connection request */
                                }}
                                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition">
                                Send Connection Request
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatchSuggestions;
