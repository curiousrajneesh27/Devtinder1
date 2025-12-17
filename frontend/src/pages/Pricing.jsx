import { useGlobalStore } from "../store/useStore";
import useSubscription from "../hooks/useSubscription";
import { FaCheck, FaCrown } from "react-icons/fa";
import toast from "react-hot-toast";

const Pricing = () => {
    const { user } = useGlobalStore();
    const { isLoading, handleSubscription } = useSubscription();

    const plans = [
        {
            name: "Free",
            price: 0,
            features: [
                "5 connection requests per day",
                "Basic profile",
                "Limited chat",
                "View 10 profiles per day"
            ],
            buttonText: "Current Plan",
            buttonDisabled: true,
            popular: false
        },
        {
            name: "Premium",
            price: 499,
            features: [
                "Unlimited connection requests",
                "Priority in feed",
                "Unlimited chat",
                "See who viewed your profile",
                "Advanced search filters",
                "Ad-free experience"
            ],
            buttonText: "Upgrade to Premium",
            buttonDisabled: false,
            popular: true,
            plan: "premium"
        },
        {
            name: "Gold",
            price: 999,
            features: [
                "All Premium features",
                "Gold badge on profile",
                "Top priority in feed",
                "Direct messaging",
                "Profile boost (3x visibility)",
                "Exclusive networking events",
                "Priority support"
            ],
            buttonText: "Upgrade to Gold",
            buttonDisabled: false,
            popular: false,
            plan: "gold"
        }
    ];

    const handleUpgrade = (plan, amount) => {
        if (!user) {
            toast.error("Please login to subscribe");
            return;
        }
        handleSubscription(plan, amount);
    };

    return (
        <div className="flex-1 overflow-y-auto py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-neutral-content mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-lg text-neutral-content/70">
                        Unlock premium features and boost your networking
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-base-100 rounded-2xl shadow-lg p-8 ${
                                plan.popular
                                    ? "border-2 border-primary transform scale-105"
                                    : "border border-gray-200"
                            }`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <h3 className="text-2xl font-bold text-neutral-content">
                                        {plan.name}
                                    </h3>
                                    {plan.name === "Gold" && (
                                        <FaCrown className="text-yellow-500 text-xl" />
                                    )}
                                </div>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-primary">
                                        ₹{plan.price}
                                    </span>
                                    {plan.price > 0 && (
                                        <span className="text-neutral-content/60">/month</span>
                                    )}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3">
                                        <FaCheck className="text-primary mt-1 flex-shrink-0" />
                                        <span className="text-neutral-content/80">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleUpgrade(plan.plan, plan.price)}
                                disabled={
                                    plan.buttonDisabled ||
                                    isLoading ||
                                    user?.subscriptionPlan === plan.plan
                                }
                                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                                    plan.popular
                                        ? "bg-primary text-white hover:bg-primary/90"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                } disabled:opacity-50 disabled:cursor-not-allowed`}>
                                {user?.subscriptionPlan === plan.plan?.toLowerCase()
                                    ? "Current Plan"
                                    : plan.buttonText}
                            </button>

                            {user?.subscriptionPlan === plan.plan?.toLowerCase() && (
                                <p className="text-center text-sm text-primary mt-3">
                                    Active until{" "}
                                    {new Date(user.subscriptionEndDate).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-base-100 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-neutral-content mb-2">
                        Need a custom plan?
                    </h3>
                    <p className="text-neutral-content/70">
                        Contact us for enterprise solutions and team plans
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
