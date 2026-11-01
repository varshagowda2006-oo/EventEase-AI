import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, DollarSign, Clock, Users, ShieldCheck } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

const planningSteps = [
  "Analyzing event parameters & guest count...",
  "Calibrating Indian Rupee (INR ₹) budget distribution...",
  "Curating authentic decor, color palette & theme concepts...",
  "Synthesizing vendor checklist & priority tasks...",
  "Polishing personalized master event timeline..."
];

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Generating Your AI Event Blueprint",
  subMessage = "Our Generative AI engine is tailoring every detail for your celebration."
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % planningSteps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-md mx-auto">
      {/* Animated Glowing Ring */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full border-4 border-lavender-200 border-t-lavender-700 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-lavender-600 to-rose-400 text-white flex items-center justify-center shadow-soft animate-pulse">
            <Sparkles className="w-7 h-7" />
          </div>
        </div>
      </div>

      <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">{message}</h3>
      <p className="text-sm text-navy-600 mb-6 leading-relaxed">{subMessage}</p>

      {/* Progress pill step */}
      <div className="w-full bg-ivory-200/80 rounded-2xl p-4 border border-lavender-200 shadow-soft-sm">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-lavender-800">
          <span className="w-2 h-2 rounded-full bg-lavender-600 animate-ping"></span>
          <span>{planningSteps[currentStepIndex]}</span>
        </div>

        {/* Multi-step progress bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-lavender-600 via-rose-400 to-lavender-800 h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStepIndex + 1) / planningSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-navy-400 font-medium">
        <span className="flex items-center gap-1">
          <DollarSign className="w-3.5 h-3.5 text-lavender-600" /> INR ₹ Budget Calibration
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-lavender-600" /> Dynamic Timeline
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-lavender-600" /> Vendor Intelligence
        </span>
      </div>
    </div>
  );
};

