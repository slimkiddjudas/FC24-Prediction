import { useState } from 'react';
import predictionService from '../services/predictionService.js';

const usePrediction = () => {
  const [position, setPosition] = useState('');
  const [attributes, setAttributes] = useState({});
  const [predictedValue, setPredictedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
  };

  const handleAttributeChange = (attribute, value) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value,
    }));
  };

  const predictMarketValue = async () => {
    setLoading(true);
    setError(null);
    try {
      const value = await predictionService.predictMarketValue(position, attributes);
      setPredictedValue(value);
    } catch (err) {
      setError('Error predicting market value', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    position,
    attributes,
    predictedValue,
    loading,
    error,
    handlePositionChange,
    handleAttributeChange,
    predictMarketValue,
  };
};

export default usePrediction;