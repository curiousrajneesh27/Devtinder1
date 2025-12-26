import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./styles/index.css";

// Register service worker for PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("Service Worker registered:", registration);
            })
            .catch((error) => {
                console.log("Service Worker registration failed:", error);
            });
    });
}

// Request notification permission
if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
    });
}

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
