import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import { AxiosError } from "axios";

const useSubscription = () => {
    const [isLoading, setIsLoading] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubscription = async (plan, amount) => {
        setIsLoading(true);
        const toastId = toast.loading("Processing...");

        try {
            // Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                toast.error("Failed to load payment gateway");
                return;
            }

            // Get Razorpay key
            const keyResponse = await axiosInstance.get("/payment/key");
            const razorpayKey = keyResponse.data.data.key;

            // Create order
            const orderResponse = await axiosInstance.post("/payment/create-order", {
                plan,
                amount
            });

            const { orderId, amount: orderAmount, currency, subscriptionId } = orderResponse.data.data;

            // Razorpay options
            const options = {
                key: razorpayKey,
                amount: orderAmount,
                currency: currency,
                name: "DevTinder",
                description: `${plan.toUpperCase()} Subscription`,
                order_id: orderId,
                handler: async function (response) {
                    try {
                        // Verify payment
                        const verifyResponse = await axiosInstance.post("/payment/verify", {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            subscriptionId
                        });

                        toast.success(verifyResponse.data.message);
                        window.location.reload(); // Reload to update subscription status
                    } catch (err) {
                        if (err instanceof AxiosError) {
                            toast.error(err.response.data.message);
                        }
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: ""
                },
                theme: {
                    color: "#667eea"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response.data.message);
            }
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

    return { isLoading, handleSubscription };
};

export default useSubscription;
