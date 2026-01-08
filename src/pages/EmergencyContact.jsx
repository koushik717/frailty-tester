import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmergencyContact = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/terms');
    };

    return (
        <div className="min-h-screen bg-[#FBF9F6] flex flex-col">


            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl w-full">
                    <h2 className="text-3xl font-bold text-[#064E3B] font-montserrat mb-8 text-center">
                        Emergency Contact
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Primary Emergency Contact Name</label>
                            <input type="text" placeholder="Name" className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white italic focus:outline-none focus:ring-green-500 focus:border-green-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Relationship</label>
                            <input type="text" placeholder="Relationship" className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white italic focus:outline-none focus:ring-green-500 focus:border-green-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
                            <input type="text" placeholder="Enter number" className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white italic focus:outline-none focus:ring-green-500 focus:border-green-500" />
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-12">
                            <button type="button" className="w-full py-3 px-4 border border-[#059669] text-[#059669] font-bold rounded-full hover:bg-green-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="w-full py-3 px-4 bg-[#059669] text-white font-bold rounded-full hover:bg-[#047857] transition-colors">
                                Continue
                            </button>
                        </div>

                    </form>
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

export default EmergencyContact;
