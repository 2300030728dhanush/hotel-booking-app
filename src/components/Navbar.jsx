import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hotel, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-primary-600 rounded-lg text-white group-hover:bg-primary-700 transition-colors">
                            <Hotel size={24} />
                        </div>
                        <span className={`text-xl font-serif font-bold ${scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-white'}`}>
                            LuxeStay
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className={`font-medium hover:text-primary-600 transition-colors ${scrolled ? 'text-slate-600' : 'text-white/90 hover:text-white'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/bookings"
                            className={`font-medium hover:text-primary-600 transition-colors ${scrolled ? 'text-slate-600' : 'text-white/90 hover:text-white'
                                }`}
                        >
                            My Bookings
                        </Link>
                        <Link
                            to="/bookings"
                            className="px-5 py-2.5 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-all hover:shadow-lg active:scale-95"
                        >
                            Sign In
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu className={scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-white'} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            <Link to="/" className="text-slate-600 font-medium py-2">Home</Link>
                            <Link to="/bookings" className="text-slate-600 font-medium py-2">My Bookings</Link>
                            <Link to="/bookings" className="btn-primary text-center">Sign In</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
