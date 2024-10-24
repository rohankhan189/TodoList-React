import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Modal from "../Components/modal/subscription";

const stripePromise = loadStripe(
  "pk_test_51Q69p1GHA8PqsncPDyHCXPx3qeeDaAdccq89IGdEaW8eF6KCpgGapsZd46i9XDO5G5jPUkTM4aTPI3TxY5B2WJ7i00qCdDQFoT"
);

const PaymentPlan = () => {
  const location = useLocation();
  const { userInfo } = location.state || {};
  const [activePlan, setActivePlan] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!userInfo || !userInfo._id) return;

      try {
        const response = await axios.get(
          "http://localhost:8000/subscribe/subscription-status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { activePlan, subscriptionDetails, message } = response.data;
        setActivePlan(activePlan);
        if (message) {
          setModalMessage(message);
          setSubscriptionDetails(subscriptionDetails);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    fetchSubscriptionStatus();
  }, [userInfo, token]);

  const handleSelectPlan = async (planType) => {
    if (planType === activePlan) {
      alert(`You already have an active ${planType} plan.`);
      return;
    }

    const stripe = await stripePromise;
    const url =
      planType === "Pro"
        ? "http://localhost:8000/subscribe/pro"
        : "http://localhost:8000/subscribe/premium";

    try {
      const response = await axios.post(
        url,
        { userId: userInfo._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { sessionId, message } = response.data;

      if (message) {
        setModalMessage(message);
        setSubscriptionDetails(response.data.subscriptionDetails);
        setIsModalOpen(true);
      }

      if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Error redirecting to Checkout:", error);
        }
      }
    } catch (error) {
      console.error(`Error selecting ${planType} Plan:`, error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Choose Your Subscription Plan
        </h1>
        <p className="text-gray-600 mt-4">
          Select the plan that best suits your needs. Enjoy our services with no
          hidden fees!
        </p>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pro Plan */}
        <div className="bg-white shadow-lg border-2 border-yellow-400 rounded-lg p-6 text-center transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Pro Plan
          </h2>
          <p className="text-gray-600 mb-6">
            Unlock premium features with the Pro plan.
          </p>
          <ul className="text-gray-700 mb-6">
            <li className="mb-2">✨ Unlimited access to all core features</li>
            <li className="mb-2">✨ Priority customer support</li>
            <li className="mb-2">✨ Access to advanced tools</li>
          </ul>
          <button
            className={`${
              activePlan === "Pro"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white py-2 px-4 rounded`}
            onClick={() => handleSelectPlan("Pro")}
            disabled={activePlan === "Pro"} // Disable if pro is active
          >
            {activePlan === "Pro" ? "Activated" : "Select Pro Plan"}
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white shadow-lg border-2 border-blue-400 rounded-lg p-6 text-center transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Premium Plan
          </h2>
          <p className="text-gray-600 mb-6">
            Get the ultimate experience with all features unlocked.
          </p>
          <ul className="text-gray-700 mb-6">
            <li className="mb-2">🌟 Unlimited access to all features</li>
            <li className="mb-2">🌟 Dedicated customer support</li>
            <li className="mb-2">🌟 Early access to new features</li>
            <li className="mb-2">🌟 Free upgrades and discounts</li>
          </ul>
          <button
            className={`${
              activePlan === "Premium"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded`}
            onClick={() => handleSelectPlan("Premium")}
            disabled={activePlan === "Premium"} // Disable if premium is active
          >
            {activePlan === "Premium" ? "Activated" : "Select Premium Plan"}
          </button>
        </div>
      </div>

      {/* Modal to show messages */}
      {isModalOpen && (
        <Modal
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
          subscriptionDetails={subscriptionDetails}
        />
      )}
    </div>
  );
};

export default PaymentPlan;
