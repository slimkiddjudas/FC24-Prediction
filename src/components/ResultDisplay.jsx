import React from 'react';
import { TrendingUp, Euro, Award, BarChart3 } from 'lucide-react';

function ResultDisplay({ predictedValue }) {
  if (!predictedValue || predictedValue.predicted_value_eur === undefined) {
    return (
      <div className="text-center text-gray-600">
        <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p>Please enter player attributes to see the predicted market value.</p>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getValueCategory = (value) => {
    if (value >= 100000000) return { label: 'World Class', color: 'text-purple-600', bgColor: 'bg-purple-100' };
    if (value >= 50000000) return { label: 'Elite', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (value >= 20000000) return { label: 'Top Player', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (value >= 5000000) return { label: 'Good Player', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { label: 'Developing', color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  const category = getValueCategory(predictedValue.predicted_value_eur);

  return (
    <div className="space-y-6">
      {/* Main Value Display */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Predicted Market Value</h3>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Euro className="w-8 h-8 text-green-600" />
            <span className="text-4xl font-bold text-green-800">
              {formatCurrency(predictedValue.predicted_value_eur)}
            </span>
          </div>
          
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${category.bgColor}`}>
            <Award className={`w-4 h-4 ${category.color}`} />
            <span className={`text-sm font-medium ${category.color}`}>
              {category.label}
            </span>
          </div>
        </div>
      </div>

      {/* Value Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Value Range</span>
          </div>
          <p className="text-lg font-semibold text-blue-900">
            {formatCurrency(predictedValue.predicted_value_eur * 0.8)} - {formatCurrency(predictedValue.predicted_value_eur * 1.2)}
          </p>
          <p className="text-xs text-blue-600">±20% estimation range</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Market Tier</span>
          </div>
          <p className="text-lg font-semibold text-purple-900">{category.label}</p>
          <p className="text-xs text-purple-600">Based on current market trends</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          <span className="font-medium">Note:</span> This prediction is based on player attributes and position. 
          Actual market values may vary due to external factors like performance, injuries, and market demand.
        </p>
      </div>
    </div>
  );
}

export default ResultDisplay;