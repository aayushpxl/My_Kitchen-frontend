import React, { useState } from 'react';
import Button from '../ui/Button';
import { getImageUrl } from '../../utils/imageUtils';

const CookingMode = ({ recipe }) => {
    const [isStarted, setIsStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = recipe?.steps || [];

    // If no steps, show message
    if (!steps || steps.length === 0) {
        return <p className="text-gray-500">No instructions available for this recipe.</p>;
    }

    const totalSteps = steps.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setIsStarted(false);
        setIsCompleted(false);
        setCurrentStep(0);
    };

    // Helper to split title from description
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
            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 text-center border border-gray-100 shadow-inner group">
                <div className="relative w-48 h-32 mx-auto mb-8 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                    <img
                        src={getImageUrl(recipe.image)}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-200 text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Interactive Cooking</h3>
                <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                    We'll guide you through each of the <span className="text-orange-600 font-bold">{totalSteps} steps</span> to create your masterpiece.
                </p>
                <Button
                    onClick={() => setIsStarted(true)}
                    className="bg-orange-600 hover:bg-black text-white px-12 py-4 rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-95 text-base font-black uppercase tracking-widest"
                >
                    Let's Begin
                </Button>
            </div>
        );
    }

    if (isCompleted) {
        return (
            <div className="bg-emerald-50 rounded-[2.5rem] p-12 text-center border border-emerald-100 animate-in zoom-in duration-300">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-3xl font-black text-emerald-900 mb-2">Bon Appétit!</h3>
                <p className="text-emerald-700 font-medium mb-8">You've successfully completed "{recipe.title}".</p>
                <div className="flex justify-center gap-4">
                    <Button
                        onClick={handleReset}
                        className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all"
                    >
                        Cook Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-6 md:p-10 flex flex-col md:flex-row gap-8">
            {/* Step Counter & Info */}
            <div className="w-full md:w-36 shrink-0 flex flex-col items-center md:items-stretch">
                <div className="bg-orange-50/80 rounded-3xl p-4 md:p-6 text-center border border-orange-100/50 mb-4 w-full">
                    <div className="text-[9px] uppercase font-black tracking-widest text-orange-400 mb-1">Step</div>
                    <div className="text-3xl font-black text-orange-600">
                        {currentStep + 1}<span className="text-sm opacity-30 mx-0.5">/</span>{totalSteps}
                    </div>
                </div>

                {/* Visual Progress Bar (Vertical on Desktop) */}
                <div className="w-full bg-gray-100 rounded-full h-1.5 hidden md:block overflow-hidden shadow-inner">
                    <div
                        className="bg-orange-500 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Main Step Content */}
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-[2px] bg-orange-500 rounded-full"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Step Instructions</span>
                </div>

                <h4 className="text-2xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                    {activeContent.title}
                </h4>

                <div className="bg-gray-50/50 rounded-3xl p-8 mb-8 border border-gray-100/50">
                    <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed italic">
                        "{activeContent.description}"
                    </p>
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-3 mt-auto">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className={`flex-1 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${currentStep === 0
                            ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                            : 'bg-white border-2 border-orange-100 text-orange-600 hover:bg-orange-50 active:scale-95'
                            }`}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex-[2] py-4 bg-gray-900 hover:bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-gray-200 hover:shadow-orange-200 transition-all active:scale-95"
                    >
                        {currentStep === totalSteps - 1 ? 'Finish Recipe' : 'Next Step'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookingMode;
