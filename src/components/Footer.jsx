import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0f0f0f] text-white pt-10 pb-4 px-6 mt-12 border-t-2 border-orange-500/20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    
                    {/* Brand Info */}
                    <div className="space-y-3">
                        <h2 className="text-2xl font-black italic">
                            FOOD<span className="text-orange-500">BRIDGE</span>
                        </h2>
                        <p className="text-zinc-400 text-[13px] leading-relaxed max-w-xs">
                            Fresh and fast delivery to your doorstep. Your favorite meals, just a click away.
                        </p>
                        <div className="flex gap-3 pt-1">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 bg-zinc-800/50 hover:bg-orange-500 rounded-lg transition-all duration-300">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Explore */}
                    <div>
                        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-orange-500">Explore</h3>
                        <ul className="grid grid-cols-1 gap-2 text-zinc-400 text-[13px]">
                            {['Browse Menu', 'Special Offers', 'Track Order', 'Become a Rider'].map((item) => (
                                <li key={item} className="hover:text-white cursor-pointer transition-colors w-fit">{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-orange-500">Contact</h3>
                        <div className="space-y-2 text-[13px] text-zinc-400">
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-orange-500" />
                                <span>+880 1700 000 000</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-orange-500" />
                                <span>support@foodking.com</span>
                            </div>
                            <div className="flex items-center gap-2 leading-tight">
                                <MapPin size={14} className="text-orange-500 shrink-0" />
                                <span>Gulshan, Dhaka, BD</span>
                            </div>
                        </div>
                    </div>

                    {/* Working Hours (Get App এর বদলে) */}
                    <div>
                        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-orange-500">Working Hours</h3>
                        <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50 space-y-2">
                            <div className="flex justify-between items-center text-[12px]">
                                <span className="text-zinc-400">Mon - Fri:</span>
                                <span className="text-white font-medium">09am - 11pm</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px]">
                                <span className="text-zinc-400">Sat - Sun:</span>
                                <span className="text-orange-500 font-bold">10am - 12pm</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1 border-t border-zinc-800">
                                <Clock size={12} />
                                <span>Fast delivery 24/7</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-zinc-800/50 pt-4 flex flex-col md:row justify-between items-center text-[11px] text-zinc-500 uppercase tracking-widest">
                    <p>&copy; 2025 FoodKing. All rights reserved.</p>
                    <div className="flex gap-6 mt-2 md:mt-0">
                        <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white cursor-pointer">Terms of Use</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;