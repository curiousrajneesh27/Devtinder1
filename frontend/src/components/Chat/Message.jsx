import { useGlobalStore } from "../../store/useStore";
import { FaFilePdf, FaFileCode, FaFile, FaDownload } from "react-icons/fa";

const Message = ({ message }) => {
    const { user } = useGlobalStore();
    const fromMe = user?._id === message?.senderId?._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const photoUrl = fromMe ? user?.photoUrl : message?.senderId?.photoUrl;
    const formattedTime = new Date(message?.createdAt).toLocaleDateString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    const renderMessageContent = () => {
        if (message?.messageType === "image") {
            return (
                <div className="max-w-xs">
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${message.fileUrl}`}
                        alt={message.fileName}
                        className="rounded-lg max-w-full h-auto"
                        loading="lazy"
                    />
                    <p className="text-xs mt-1">{message.fileName}</p>
                </div>
            );
        } else if (message?.messageType === "file" || message?.messageType === "code") {
            const getFileIcon = () => {
                if (message.mimeType?.includes("pdf")) return <FaFilePdf className="text-red-500 text-2xl" />;
                if (message.messageType === "code") return <FaFileCode className="text-blue-500 text-2xl" />;
                return <FaFile className="text-gray-500 text-2xl" />;
            };

            return (
                <div className="flex items-center gap-3 p-2 bg-opacity-20 bg-white rounded-lg">
                    {getFileIcon()}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{message.fileName}</p>
                        <p className="text-xs opacity-70">{(message.fileSize / 1024).toFixed(2)} KB</p>
                        {message.codeLanguage && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded mt-1 inline-block">
                                {message.codeLanguage}
                            </span>
                        )}
                    </div>
                    <a
                        href={`${import.meta.env.VITE_BACKEND_URL}${message.fileUrl}`}
                        download
                        className="p-2 hover:bg-white hover:bg-opacity-30 rounded-full transition">
                        <FaDownload />
                    </a>
                </div>
            );
        }
        return <span className="whitespace-pre-line break-words">{message?.message}</span>;
    };

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-8 sm:w-10 rounded-full">
                    <img
                        loading="lazy"
                        alt="user-photo"
                        src={photoUrl}
                    />
                </div>
            </div>
            <div className={`chat-bubble text-xs sm:text-sm mb-1 ${message?.messageType !== "text" ? "p-3" : ""}`}>
                {renderMessageContent()}
            </div>
            <div className="chat-footer opacity-50 text-xs sm:text-sm flex gap-1 items-center text-base-content">
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;
