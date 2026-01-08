import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Linkedin, Info } from 'lucide-react';

const Billing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedPlan = location.state?.plan || {
        title: "Individual Plan",
        price: "$19.99", // Example default
        period: "/month"
    };

    // Calculate totals
    const priceNum = parseFloat(selectedPlan.price.replace('$', '')) || 0;
    const tax = priceNum * 0.10; // 10% tax example
    const total = priceNum + tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/personal-details');
    };

    return (
        <div className="min-h-screen bg-[#FBF9F6] flex flex-col">


            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <h2 className="text-3xl font-bold text-[#064E3B] font-montserrat mb-8">Billing Details</h2>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row p-8 gap-12">

                        {/* Left Column: Billing Address & Payment */}
                        <div className="flex-1 space-y-8">
                            {/* Billing Address */}
                            <div>
                                <h3 className="text-lg font-bold text-[#064E3B] mb-4 font-montserrat">Billing Address</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name*</label>
                                        <input type="text" placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Address*</label>
                                        <input type="text" placeholder="Address" className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">City*</label>
                                        <input type="text" placeholder="City" className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">State*</label>
                                            <select className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic text-gray-500">
                                                <option>Select State</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Zip Code*</label>
                                            <input type="text" placeholder="Zip Code" className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic" required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div>
                                <h3 className="text-lg font-bold text-[#064E3B] mb-4 font-montserrat">Payment</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number*</label>
                                        <input type="text" placeholder="Card Number" className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Name on Card*</label>
                                        <input type="text" placeholder="Card Number" className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">Expiration Date*</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic text-gray-500">
                                                    <option>Month</option>
                                                </select>
                                                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic text-gray-500">
                                                    <option>Year</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">CVV*</label>
                                            <input type="text" placeholder="CVV" className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 italic" required />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full mt-6 bg-[#059669] text-white font-bold py-3 rounded-md hover:bg-[#047857] transition-colors">
                                    Place Order
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="flex-1 lg:max-w-md">
                            <h3 className="text-lg font-bold text-[#064E3B] mb-4 font-montserrat">Order Summary</h3>

                            <div className="border border-gray-200 rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-gray-900">{selectedPlan.title}</span>
                                    <span className="font-bold text-gray-900">{selectedPlan.price}{selectedPlan.period.replace('per member', '/month')}</span>
                                </div>
                                <div className="text-xs text-gray-500">Billed Monthly</div>
                            </div>

                            <div className="flex gap-2 mb-6">
                                <input type="text" placeholder="Promo Code" className="flex-1 p-2 border border-gray-300 rounded text-sm bg-gray-50 italic" />
                                <button type="button" className="bg-[#059669] text-white px-6 py-2 rounded text-sm font-semibold">Apply</button>
                            </div>

                            <div className="space-y-3 py-4 border-t border-gray-200 text-sm">
                                <div className="flex justify-between text-gray-800">
                                    <span>Subtotal</span>
                                    <span>${priceNum.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-800">
                                    <span>Tax (10%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-200 mt-4">
                                    <span>Total due today</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                    </form>
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

export default Billing;
