import React from 'react';
import { Heart, Activity, Shield, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-[#FBF9F6] flex flex-col pt-32">

            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#064E3B] font-montserrat mb-6">
                        Empowering Healthy Aging
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        FrailtyTester is an advanced digital health platform designed to help individuals monitor their physical and cognitive health.
                        Our mission is to provide accessible, clinical-grade assessments that empower you to take control of your well-being.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Activity className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Comprehensive Tests</h3>
                        <p className="text-gray-500 text-sm">
                            From mobility to cognition, our suite of checks covers all vital aspects of frailty and longevity.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Clinical Accuracy</h3>
                        <p className="text-gray-500 text-sm">
                            Built on validated metrics and standards used by geriatric health professionals worldwide.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Personalized Insights</h3>
                        <p className="text-gray-500 text-sm">
                            Get tailored feedback and actionable recommendations based on your unique health profile.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Community Focused</h3>
                        <p className="text-gray-500 text-sm">
                            Join a community dedicated to proactive health management and graceful aging.
                        </p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-[#064E3B] font-montserrat mb-6">Our Story</h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Founded in 2024, FrailtyTester emerged from a simple realization: early detection is the key to healthy aging.
                                Too often, signs of frailty are noticed only when they lead to falls or hospitalization.
                            </p>
                            <p>
                                We set out to change that story. By combining modern web technology with established medical research,
                                we created a platform that brings specific health testing out of the clinic and into your home.
                            </p>
                            <p>
                                Whether you are checking on your own health or monitoring a loved one, we are here to provide the
                                tools and clarity you need for the journey ahead.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <img
                            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Seniors enjoying life"
                            className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
