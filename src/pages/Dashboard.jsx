// Dashboard.jsx
import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // TODO: Fetch real category scores from backend
    const categories = [];

    return (
        <div className="min-h-screen bg-[#FBF9F6] flex flex-col pt-32">

            <div className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-3xl font-bold text-[#064E3B] font-montserrat">Dashboard</h2>
                    <Link to="/" className="bg-[#009A49] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-green-700 transition-colors">
                        Start a new Assessment
                    </Link>
                </div>
                <p className="text-gray-500 text-sm mb-12 max-w-2xl">
                    Welcome to your personal health dashboard. Here you can track your assessment history, view detailed reports, and monitor your progress over time.
                </p>

                <h3 className="text-2xl font-bold text-[#064E3B] font-montserrat mb-6">Frailty Index Over Time</h3>

                <div className="space-y-4">
                    {categories.length > 0 ? (
                        categories.map((cat, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center hover:shadow-md transition-all duration-300 cursor-pointer hover:border-green-100">
                                <div>
                                    <span className="text-xl font-bold text-gray-800 mr-4">{cat.name}</span>
                                    {cat.sub && <span className="text-sm text-gray-500 font-medium">( {cat.sub} )</span>}
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className={`text-2xl font-bold ${cat.color}`}>{cat.score}%</span>
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-4">No assessment data available yet.</p>
                            <Link to="/" className="text-green-600 font-bold hover:underline">Take your first assessment</Link>
                        </div>
                    )}
                </div>

            </div>

            {/* Footer */}
            <footer className="bg-[#064E3B] text-white py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                        <Facebook className="w-6 h-6" />
                        <Instagram className="w-6 h-6" />
                        <Youtube className="w-6 h-6" />
                        <Linkedin className="w-6 h-6" />
                    </div>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:underline">About Us</a>
                        <a href="#" className="hover:underline">Contact Us</a>
                    </div>
                    <div className="text-xs text-gray-400">
                        Copyright © 2025 METY Technology, Inc. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
