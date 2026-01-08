import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Shield } from 'lucide-react';

const Subscription = () => {
    // Mock current subscription data
    const currentPlan = {
        name: 'Free Trial',
        price: '$0',
        status: 'Active',
        nextBilling: 'N/A',
        features: [
            'Access to basic assessments',
            'Limited historical data',
            'Standard support'
        ]
    };

    return (
        <div className="min-h-screen bg-[#FBF9F6] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[#064E3B] font-montserrat mb-4">Subscription Management</h1>
                    <p className="text-gray-600">Manage your plan and billing details.</p>
                </div>

                {/* Current Plan Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-8 border-b border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide mb-2">
                                    Current Plan
                                </span>
                                <h2 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h2>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-bold text-gray-900">{currentPlan.price}</span>
                                <span className="text-gray-500">/month</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span>Status: <span className="font-semibold text-green-600">{currentPlan.status}</span></span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {currentPlan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-600 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            Want to unlock more features? Upgrade your plan at any time.
                        </p>
                        <Link
                            to="/pricing"
                            className="px-6 py-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-lg font-semibold shadow-sm transition-all transform hover:-translate-y-0.5"
                        >
                            Upgrade Plan
                        </Link>
                    </div>
                </div>

                {/* Billing History Placeholder */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Billing History</h3>
                    <div className="text-center py-8 text-gray-500 text-sm italic border-2 border-dashed border-gray-100 rounded-xl">
                        No billing history available for free plan.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Subscription;
