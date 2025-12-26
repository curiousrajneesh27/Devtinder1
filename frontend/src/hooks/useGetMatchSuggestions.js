import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useGetMatchSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axiosInstance.get("/user/match-suggestions");
                setSuggestions(response.data.data);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch match suggestions");
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    return { suggestions, loading };
};

export default useGetMatchSuggestions;
