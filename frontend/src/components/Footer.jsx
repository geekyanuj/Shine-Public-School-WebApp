import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">S</div>
              <span className="font-bold text-xl text-white">Shine</span>
            </div>
            <p className="text-sm text-gray-400">Empowering students to achieve their full potential through quality education and character development.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-indigo-400 transition-colors">Home</a></li>
              <li><a href="/courses" className="hover:text-indigo-400 transition-colors">Programs</a></li>
              <li><a href="/about" className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shine Public School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
