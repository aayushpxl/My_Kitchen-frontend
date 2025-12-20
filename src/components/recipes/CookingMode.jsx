import React, { useState } from 'react';
import Button from '../ui/Button';

const CookingMode = ({ steps }) => {
    const [isStarted, setIsStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // If no steps, show message
    if (!steps || steps.length === 0) {
        return <p className="text-gray-500">No instructions available for this recipe.</p>;
    }

    const totalSteps = steps.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // Helper to split title from description if user formatted it like "Step Title: description"
    const getStepContent = (text) => {
        const parts = text.split(':');
        if (parts.length > 1) {
            return { title: parts[0], description: parts.slice(1).join(':').trim() };
        }
        return { title: `Step ${currentStep + 1}`, description: text };
    };

    const activeContent = getStepContent(steps[currentStep]);

    if (!isStarted) {
        return (
            <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-200">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to start cooking?</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Follow our step-by-step guide and create something delicious!
                </p>
                <Button
                    onClick={() => setIsStarted(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl shadow-lg shadow-orange-200 text-lg"
                >
                    Start Cooking
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Step-by-Step Guide</h3>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                    Step {currentStep + 1} of {totalSteps}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8">
                <div
                    className="bg-orange-500 h-2.5 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Content Area */}
            <div className="mb-8">
                <div className="bg-gray-100 rounded-2xl h-64 mb-6 flex items-center justify-center text-gray-400">
                    {/* Placeholder for optional step image - if we had it */}
                    <span className="text-4xl text-gray-200">👨‍🍳</span>
                </div>

                <h4 className="text-xl font-extrabold text-gray-900 mb-3">{activeContent.title}</h4>
                <p className="text-gray-600 text-lg leading-relaxed">
                    {activeContent.description}
                </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`flex-1 py-3.5 rounded-xl font-bold border-2 transition-colors ${currentStep === 0
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                            : 'border-orange-500 text-orange-600 hover:bg-orange-50'
                        }`}
                >
                    Previous Step
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentStep === totalSteps - 1}
                    className={`flex-1 py-3.5 rounded-xl font-bold bg-orange-500 text-white shadow-lg shadow-orange-200 transition-colors ${currentStep === totalSteps - 1
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-orange-600'
                        }`}
                >
                    Next Step
                </button>
            </div>
        </div>
    );
};

export default CookingMode;
