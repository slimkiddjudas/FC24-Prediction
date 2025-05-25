import React from 'react';
import { Github, Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white mt-20">
      {/* Top Wave - Düzeltildi */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-px">
        <svg 
          className="w-full h-12 md:h-16 fill-current text-gray-50" 
          viewBox="0 0 1440 74" 
          preserveAspectRatio="none"
        >
          <path d="M0,42L48,37.3C96,32,192,21,288,16C384,11,480,11,576,16C672,21,768,32,864,32C960,32,1056,21,1152,16C1248,11,1344,11,1392,11L1440,11L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"/>
        </svg>
      </div>
      
      <div className="relative container mx-auto px-4 py-16 pt-20">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              FC24 Prediction
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Advanced AI-powered player market value prediction system using machine learning algorithms trained on extensive FC24 data.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a 
                href="https://github.com/slimkiddjudas" 
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/slimkiddjudas/FC24-Prediction" 
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
                aria-label="Code"
              >
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Position-specific predictions
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Real-time market value analysis
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Advanced ML algorithms
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Comprehensive attribute analysis
              </li>
            </ul>
          </div>

          {/* Technical Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-400">Technology</h4>
            <div className="text-gray-300 space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Coffee className="w-4 h-4 text-orange-400" />
                <span>React & TailwindCSS</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Code className="w-4 h-4 text-blue-400" />
                <span>Python Machine Learning</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Made with passion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FC24 Prediction. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for football enthusiasts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;