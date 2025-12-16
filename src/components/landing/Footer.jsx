import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <h4 className="font-bold text-xl text-gray-900 mb-4">My Kitchen</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Helping home cooks find inspiration and joy in every meal.
                    </p>
                </div>

                <div>
                    <h5 className="font-bold text-gray-800 mb-4">Home</h5>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-orange-500">Recipes</a></li>
                        <li><a href="#" className="hover:text-orange-500">Reviews</a></li>
                        <li><a href="#" className="hover:text-orange-500">About</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-bold text-gray-800 mb-4">Help Center</h5>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
                        <li><a href="#" className="hover:text-orange-500">FAQ</a></li>
                        <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="font-bold text-gray-800 mb-4">Subscribe</h5>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email address" className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-orange-500" />
                        <button className="bg-orange-500 text-white rounded-lg px-3 hover:bg-orange-600">→</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-8 text-center text-xs text-gray-400">
                © 2025 MyKitchen. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
