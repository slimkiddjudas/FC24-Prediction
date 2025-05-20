import React, { useState } from 'react';
import PositionSelector from './PositionSelector';
import FootSelector from './FootSelector';
import WorkRateSelector from './WorkRateSelector';
import AttributeInput from './AttributeInput';
import RatingSelector from './RatingSelector';
import ResultDisplay from './ResultDisplay';
import { attributes } from '../constants/attributes';
import { predictMarketValue } from '../services/predictionService';

function PlayerForm() {
  // Default values for attributes
  const defaultValues = {
    age: 22,
    height_cm: 180,
    weight_kg: 70,
    // Default 55 for all standard attributes will be handled in AttributeInput component
  };

  const [position, setPosition] = useState('');
  const [positionValue, setPositionValue] = useState(null);
  const [foot, setFoot] = useState('');
  const [footValue, setFootValue] = useState(null);
  const [workRate, setWorkRate] = useState('');
  const [workRateValue, setWorkRateValue] = useState(null);
  const [attributeValues, setAttributeValues] = useState(defaultValues);
  const [predictedValue, setPredictedValue] = useState(null);

  const handlePositionChange = (selectedPosition, numericValue) => {
    setPosition(selectedPosition);
    setPositionValue(numericValue);
    setAttributeValues(prev => ({
      ...prev,
      player_positions: selectedPosition,
      position_numeric: numericValue
    }));
    setPredictedValue(null);
  };

  const handleFootChange = (selectedFoot, numericValue) => {
    setFoot(selectedFoot);
    setFootValue(numericValue);
    setAttributeValues(prev => ({
      ...prev,
      preferred_foot: selectedFoot,
      foot_numeric: numericValue
    }));
    setPredictedValue(null);
  };

  const handleWorkRateChange = (selectedWorkRate, numericValue) => {
    setWorkRate(selectedWorkRate);
    setWorkRateValue(numericValue);
    setAttributeValues(prev => ({
      ...prev,
      work_rate: selectedWorkRate,
      work_rate_numeric: numericValue
    }));
    setPredictedValue(null);
  };

  const handleAttributeChange = (attribute, value) => {
    setAttributeValues((prevValues) => ({
      ...prevValues,
      [attribute]: value,
    }));
    setPredictedValue(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // attributes listesindeki tüm alanları attributeValues'dan topla
    const payload = {};
    attributes.forEach(attr => {
      payload[attr] = attributeValues[attr] !== undefined ? attributeValues[attr] : 0;
    });

    // Konsola gönderilecek veriyi yazdır
    console.log('Gönderilecek veri:', payload);

    // Şimdilik API'ye göndermeyi yoruma alabilirsiniz
    // predictMarketValue(payload).then(setPredictedValue);
  };

  // Attributes with dropdown selectors
  const ratingAttributes = ['weak_foot', 'skill_moves', 'international_reputation'];
  
  // Filter out attributes that have dedicated selectors
  const filteredAttributes = attributes.filter(attr => 
    attr !== 'player_positions' && 
    attr !== 'preferred_foot' && 
    attr !== 'work_rate' &&
    !ratingAttributes.includes(attr)
  );

  return (
    <div className="PlayerForm">
      <h2>Player Market Value Prediction</h2>
      <form onSubmit={handleSubmit}>
        <PositionSelector selectedPosition={position} onPositionChange={handlePositionChange} />
        <FootSelector selectedFoot={foot} onFootChange={handleFootChange} />
        <WorkRateSelector selectedWorkRate={workRate} onWorkRateChange={handleWorkRateChange} />
        
        {ratingAttributes.map((attribute) => (
          <RatingSelector
            key={attribute}
            attribute={attribute}
            value={attributeValues[attribute] || ''}
            onChange={(value) => handleAttributeChange(attribute, value)}
          />
        ))}

        {filteredAttributes.map((attribute) => (
          <AttributeInput
            key={attribute}
            attribute={attribute}
            value={attributeValues[attribute] || ''}
            onChange={(value) => handleAttributeChange(attribute, value)}
          />
        ))}
        
        <button type="submit" className="btn btn-primary">Predict Market Value</button>
      </form>
      {predictedValue && <ResultDisplay value={predictedValue} />}
    </div>
  );
}

export default PlayerForm;