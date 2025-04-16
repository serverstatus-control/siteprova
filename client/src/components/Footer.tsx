import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-light border-t border-dark-lighter py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">Server Status Dashboard | <span className="font-mono">v0.3.0</span></p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-400 hover:text-white">Terms</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy</a>
            <Link href="/info" className="text-sm text-gray-400 hover:text-white">Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
