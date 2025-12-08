import React from 'react';
import { Link } from 'react-router-dom';
import {
    Heart,
    Shield,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowRight
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-green-900 to-emerald-950 text-white pt-20 pb-10 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-400 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-emerald-400 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                                <Heart className="w-6 h-6 text-green-400 fill-green-400" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200 font-montserrat">
                                FrailtyTester
                            </span>
                        </div>
                        <p className="text-green-100/70 leading-relaxed">
                            Empowering you to take control of your health with scientifically validated assessments and personalized insights for a longer, healthier life.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-green-500">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-green-500">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-green-500">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-green-500">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 font-montserrat">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-green-100/70 hover:text-green-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-green-100/70 hover:text-green-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/tests" className="text-green-100/70 hover:text-green-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Assessments
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="text-green-100/70 hover:text-green-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    My Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 font-montserrat">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-green-100/70">
                                <MapPin className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <span>123 Wellness Avenue,<br />Health District, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3 text-green-100/70">
                                <Phone className="w-5 h-5 text-green-400 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-green-100/70">
                                <Mail className="w-5 h-5 text-green-400 shrink-0" />
                                <span>support@frailtytester.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 font-montserrat">Stay Updated</h3>
                        <p className="text-green-100/70 mb-4 text-sm">
                            Subscribe to our newsletter for the latest health tips and updates.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all"
                                />
                            </div>
                            <button className="w-full bg-green-500 hover:bg-green-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group">
                                Subscribe
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-green-100/50 text-sm">
                        © {currentYear} FrailtyTester. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-green-100/50">
                        <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
