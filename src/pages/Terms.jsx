import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Square, CheckSquare } from 'lucide-react';

const Terms = () => {
    const navigate = useNavigate();
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = () => {
        if (agreed) {
            navigate('/dashboard'); // Final step -> Dashboard
        }
    };

    return (
        <div className="min-h-screen bg-[#FBF9F6] flex flex-col pt-32">

            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full">
                    <h2 className="text-3xl font-bold text-[#064E3B] font-montserrat mb-8 text-center">
                        Terms & Conditions
                    </h2>

                    <div className="space-y-6 text-sm text-gray-700 leading-relaxed font-sans mb-10">
                        <p>
                            **1. Introduction**<br />
                            Welcome to FrailtyTester. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
                        </p>
                        <p>
                            **2. Medical Disclaimer**<br />
                            The content provided on this platform, including assessment results and health scores, is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                        </p>
                        <p>
                            **3. User Accounts**<br />
                            To access certain features, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
                        </p>
                        <p>
                            **4. Privacy Policy**<br />
                            Your use of our services is also governed by our Privacy Policy, which describes how we collect, use, and share your personal information. By using our services, you consent to such collection, use, and sharing.
                        </p>
                    </div>

                    <div className="flex items-start gap-3 mb-8">
                        <button onClick={() => setAgreed(!agreed)} className="text-[#059669] flex-shrink-0 mt-0.5 focus:outline-none">
                            {agreed ? <CheckSquare className="w-5 h-5 fill-current" /> : <div className="w-5 h-5 border-2 border-[#059669] rounded" />}
                        </button>
                        <p className="text-sm text-gray-800">
                            I have read an agree to the Terms & Conditions and the Privacy Policy.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <button type="button" className="w-full py-3 px-4 border border-[#059669] text-[#059669] font-bold rounded-full hover:bg-green-50 transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!agreed}
                            className={`w-full py-3 px-4 font-bold rounded-full transition-colors ${agreed ? 'bg-[#059669] text-white hover:bg-[#047857]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#064E3B] text-white py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                    <div className="flex gap-6">
                        <a href="#" className="hover:underline">About Us</a>
                        <a href="#" className="hover:underline">Contact Us</a>
                    </div>
                    <div className="text-xs text-gray-400 mt-4 md:mt-0">
                        Copyright © 2025 METY Technology, Inc. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Terms;
