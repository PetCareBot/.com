import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface PlanProps {
  name: string;
  price: string;
  features: string[];
}

const Plan: React.FC<PlanProps> = ({ name, price, features }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold mb-2">{name}</h3>
    <p className="text-3xl font-bold mb-4">{price}</p>
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="mb-2 flex items-center">
          <svg
            className="w-4 h-4 mr-2 text-green-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <Button className="w-full bg-[#ff6b6b] hover:bg-[#ff8c8c] text-white">
      Choose Plan
    </Button>
  </div>
);

interface PremiumPlansPopupProps {
  onClose: () => void;
}

const PremiumPlansPopup: React.FC<PremiumPlansPopupProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 p-8 rounded-xl shadow-2xl max-w-4xl w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Choose Your Premium Plan
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Plan
            name="Monthly"
            price="$9.99/month"
            features={[
              "Access to all premium features",
              "Priority support",
              "Custom bot commands",
              "Advanced analytics",
            ]}
          />
          <Plan
            name="Yearly"
            price="$99.99/year"
            features={[
              "All Monthly plan features",
              "2 months free",
              "Early access to new features",
              "Dedicated account manager",
            ]}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PremiumPlansPopup;
