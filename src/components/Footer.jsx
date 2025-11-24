import React from 'react';
import { Hotel, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6 text-white">
                            <div className="p-2 bg-primary-600 rounded-lg">
                                <Hotel size={24} />
                            </div>
                            <span className="text-xl font-serif font-bold">LuxeStay</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Experience the epitome of luxury and comfort. We curate the finest hotels around the globe for your perfect getaway.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary-600 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary-600 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary-600 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
                            <li><Link to="/hotels" className="hover:text-primary-500 transition-colors">Find Hotels</Link></li>
                            <li><Link to="/bookings" className="hover:text-primary-500 transition-colors">My Bookings</Link></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-serif font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="shrink-0 text-primary-500" size={20} />
                                <span>123 Luxury Avenue, Suite 100<br />New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="shrink-0 text-primary-500" size={20} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="shrink-0 text-primary-500" size={20} />
                                <span>concierge@luxestay.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-serif font-bold text-lg mb-6">Newsletter</h3>
                        <p className="text-slate-400 mb-4">Subscribe to get special offers and updates.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-slate-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 text-white placeholder:text-slate-500"
                            />
                            <button type="submit" className="btn-primary w-full">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} LuxeStay. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
