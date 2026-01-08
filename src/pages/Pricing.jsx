import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubscription } from '../store/slices/userSlice';

const Pricing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const plans = [
        {
            title: "Free Trial",
            price: "$0",
            period: "/member",
            description: "Perfect for trying out the platform. Get access to basic assessments and health tracking.",
            btnText: "Get Started",
            btnVariant: "outline",
            features: [
                "Access to 3 basic assessments",
                "Basic health score tracking",
                "Health profile creation"
            ]
        },
        {
            title: "Individual Plan",
            price: "$9.99",
            period: "/mo per member",
            description: "Complete access to all frailty assessments and detailed analytics for one person.",
            btnText: "Try it for $1/Month",
            btnVariant: "outline",
            features: [
                "Unlimited access to all tests",
                "Detailed trend analysis",
                "Personalized recommendations",
                "Priority email support"
            ]
        },
        {
            title: "Family Plan",
            price: "$9.99",
            period: "/mo (first member)",
            subtitle: "+ $7.99/mo per extra person",
            description: "Great value for families. Monitor the health of your loved ones in one place.",
            features: [
                "Everything in Individual Plan",
                "Manage up to 5 profiles",
                "Family health dashboard",
                "Compare results across profiles"
            ],
            btnText: "Get Started",
            btnVariant: "primary"
        },
        {
            title: "Enterprise Plan",
            description: "Tailored solutions for clinics, hospitals, and research institutions.",
            customPrice: "Let’s talk",
            customPeriod: "Get in touch for bulk pricing",
            btnText: "Contact Us",
            btnVariant: "primary",
            features: [
                "HIPAA Compliance",
                "API Access",
                "Dedicated Account Manager",
                "Custom Reporting"
            ]
        }
    ];

    const handleSelectPlan = async (plan) => {
        if (!user) {
            navigate('/signup');
            return;
        }
        const status = 'Active';
        try {
            await dispatch(updateSubscription({ plan: plan.title, status })).unwrap();
            navigate('/personal-details');
        } catch (error) {
            console.error('Failed to select plan:', error);
            alert('Failed to select plan. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#FBF9F6] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#064E3B] font-montserrat mt-12 mb-4">
                        Select your plan to get started
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <div key={index} className="rounded-2xl border p-6 flex flex-col h-full bg-white border-gray-200 transition-shadow hover:shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-montserrat">{plan.title}</h3>
                            <p className="text-gray-600 text-sm mb-6 flex-grow-0">{plan.description}</p>
                            <div className="mb-6">
                                {plan.customPrice ? (
                                    <>
                                        <div className="text-3xl font-bold text-gray-900">{plan.customPrice}</div>
                                        <div className="text-sm text-gray-600 mt-1">{plan.customPeriod}</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-start gap-1">
                                            <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                                            {plan.subtitle ? (
                                                <span className="text-sm font-semibold text-[#059669]">{plan.subtitle}</span>
                                            ) : (
                                                <div className="text-sm text-gray-600">{plan.period}</div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={() => handleSelectPlan(plan)}
                                className={`w-full py-3 px-4 rounded-full font-semibold transition-colors mb-8 ${plan.btnVariant === 'primary' ? 'bg-[#059669] text-white hover:bg-[#047857]' : 'bg-white border border-[#059669] text-[#059669] hover:bg-green-50'}`}
                            >
                                {plan.btnText}
                            </button>
                            <ul className="space-y-3 text-sm text-gray-600 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
