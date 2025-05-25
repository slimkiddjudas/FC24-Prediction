import React from 'react';
import { Trophy, Target, Zap } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20">
        <div className="absolute inset-0 opacity-20"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16 text-center">
        {/* Main Title */}
        <div className="mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              FC24 Prediction
            </h1>
            <Target className="w-12 h-12 text-green-400" />
          </div>
          
          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto leading-relaxed">
            Predict your player's potential with our advanced AI-powered rating system
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-4 mx-auto">
              <Zap className="w-6 h-6 text-blue-200" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
            <p className="text-blue-100 text-sm">Advanced machine learning algorithms for accurate predictions</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-4 mx-auto">
              <Trophy className="w-6 h-6 text-purple-200" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Position-Specific</h3>
            <p className="text-blue-100 text-sm">Tailored predictions based on player position and attributes</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-4 mx-auto">
              <Target className="w-6 h-6 text-green-200" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Accurate Results</h3>
            <p className="text-blue-100 text-sm">Trained on extensive FC24 player data for precise ratings</p>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave - Düzeltildi */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-px">
        <svg 
          className="w-full h-12 md:h-16 fill-current text-gray-50" 
          viewBox="0 0 1440 74" 
          preserveAspectRatio="none"
        >
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z"/>
        </svg>
      </div>
    </header>
  );
};

export default Header;