import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PositionSelector from './PositionSelector';
import FootSelector from './FootSelector';
import WorkRateSelector from './WorkRateSelector';
import AttributeInput from './AttributeInput';
import RatingSelector from './RatingSelector';
import ResultDisplay from './ResultDisplay';
import { attributes } from '../constants/attributes';
import { predictMarketValue } from '../services/predictionService';
import { workRateMapping } from '../constants/workRateMapping';
import { positionMapping } from '../constants/positionMapping';
import { footMapping } from '../constants/footMapping';

function PlayerForm() {
  const [predictedValue, setPredictedValue] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Attribute configuration
  const attributeConfig = {
    age: { min: 15, max: 40, defaultValue: 22 },
    height_cm: { min: 155, max: 210, defaultValue: 180 },
    weight_kg: { min: 50, max: 120, defaultValue: 70 },
    default: { min: 0, max: 100, defaultValue: 55 }
  };

  // Helper for formatting attribute names
  const formatAttributeName = (attr) => attr
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Build Zod schema dynamically based on attributes
  const createFormSchema = () => {
    // Başlangıç şeması oluştur
    const baseSchema = {
      // String olarak position, foot ve work_rate
      position: z.string().min(1, "Position is required"),
      foot: z.string().min(1, "Preferred foot is required"),
      work_rate: z.string().min(1, "Work rate is required"),
    };
    
    // Add validation for each attribute
    attributes.forEach(attr => {
      // Özel alanlar için boş şema oluşturma (zaten yukarıda tanımlandı)
      if (['player_positions', 'preferred_foot', 'work_rate'].includes(attr)) {
        return;
      }
      
      // Her öznitelik için yapılandırmayı al
      const config = attributeConfig[attr] || attributeConfig.default;
      
      // Zorunlu alanlar hariç diğer alanları isteğe bağlı yap
      baseSchema[attr] = z.preprocess(
        // Boş değerleri undefined'a dönüştür
        val => val === '' ? undefined : Number(val),
        z.number({
          invalid_type_error: `${formatAttributeName(attr)} must be a number`
        })
        .int(`${formatAttributeName(attr)} must be an integer`)
        .min(config.min, `${formatAttributeName(attr)} must be at least ${config.min}`)
        .max(config.max, `${formatAttributeName(attr)} must be no more than ${config.max}`)
        .optional()  // İsteğe bağlı yap
        .or(z.literal(''))  // Boş string'i de kabul et
      );
    });
    
    return z.object(baseSchema);
  };

  // Create the schema
  const formSchema = createFormSchema();

  // Default values
  const defaultValues = {
    position: '',
    foot: '',
    work_rate: '',
    age: attributeConfig.age.defaultValue.toString(),
    height_cm: attributeConfig.height_cm.defaultValue.toString(),
    weight_kg: attributeConfig.weight_kg.defaultValue.toString(),
  };
  
  // Set up React Hook Form
  const { 
    handleSubmit, 
    setValue, 
    watch,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  // Watch values for controlled components
  const watchedPosition = watch('position');
  const watchedFoot = watch('foot');
  const watchedWorkRate = watch('work_rate');

  // Handle selector changes
  const handlePositionChange = (position) => {
    setValue('position', position, { shouldValidate: true });
    setPredictedValue(null);
    setApiError(null);
  };

  const handleFootChange = (foot) => {
    setValue('foot', foot, { shouldValidate: true });
    setPredictedValue(null);
    setApiError(null);
  };

  const handleWorkRateChange = (workRate) => {
    setValue('work_rate', workRate, { shouldValidate: true });
    setPredictedValue(null);
    setApiError(null);
  };

  // Handle attribute input changes
  const handleAttributeChange = (attribute, value) => {
    setValue(attribute, value, { shouldValidate: true });
    setPredictedValue(null);
    setApiError(null);
  };
  
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Create payload for API
      const payload = {};
      
      // Process all attributes except special fields
      attributes.forEach(attr => {
        if (!['player_positions', 'preferred_foot', 'work_rate'].includes(attr)) {
          let value = data[attr];
          
          // Boş ise varsayılan değeri kullan
          if (value === undefined || value === '') {
            const config = attributeConfig[attr] || attributeConfig.default;
            value = config.defaultValue;
          } else {
            // String'i sayıya çevir
            value = Number(value);
          }
          
          payload[attr] = value;
        }
      });
      
      // Mapping'leri kullanarak sayısal değerleri ekle
      if (data.position) {
        payload.player_positions = positionMapping[data.position];
      }
      
      if (data.foot) {
        payload.preferred_foot = footMapping[data.foot];
      }
      
      if (data.work_rate) {
        payload.work_rate = workRateMapping[data.work_rate];
      }
      
      console.log('Gönderilecek veri:', payload);
      
      // Call API
      const result = await predictMarketValue(payload);
      console.log('API response:', result);
      setPredictedValue(result);
      setApiError(null);
    } catch (error) {
      console.error('API error:', error);
      setApiError(`Error: ${error.message}`);
      setPredictedValue(null);
    }
  };

  // Separate attributes that have special input components
  const ratingAttributes = ['weak_foot', 'skill_moves', 'international_reputation'];
  const filteredAttributes = attributes.filter(attr => 
    !['player_positions', 'preferred_foot', 'work_rate'].includes(attr) &&
    !ratingAttributes.includes(attr)
  );

  return (
    <div className="PlayerForm">
      <h2>Player Market Value Prediction</h2>
      
      {apiError && (
        <div className="alert alert-danger" role="alert">
          {apiError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Selector inputs */}
        <div className="form-group mb-3">
          <PositionSelector 
            selectedPosition={watchedPosition} 
            onPositionChange={handlePositionChange}
          />
          {errors.position && (
            <p className="text-danger">{errors.position.message}</p>
          )}
        </div>
        
        <div className="form-group mb-3">
          <FootSelector 
            selectedFoot={watchedFoot} 
            onFootChange={handleFootChange} 
          />
          {errors.foot && (
            <p className="text-danger">{errors.foot.message}</p>
          )}
        </div>
        
        <div className="form-group mb-3">
          <WorkRateSelector 
            selectedWorkRate={watchedWorkRate} 
            onWorkRateChange={handleWorkRateChange} 
          />
          {errors.work_rate && (
            <p className="text-danger">{errors.work_rate.message}</p>
          )}
        </div>
        
        {/* Rating attributes */}
        {ratingAttributes.map(attribute => (
          <div key={attribute} className="form-group mb-3">
            <RatingSelector
              attribute={attribute}
              value={watch(attribute) || ''}
              onChange={(value) => handleAttributeChange(attribute, value)}
            />
            {errors[attribute] && (
              <p className="text-danger">{errors[attribute].message}</p>
            )}
          </div>
        ))}

        {/* Standard attributes */}
        {filteredAttributes.map(attribute => (
          <div key={attribute} className="form-group mb-3">
            <AttributeInput
              attribute={attribute}
              value={watch(attribute) || ''}
              onChange={(value) => handleAttributeChange(attribute, value)}
            />
            {errors[attribute] && (
              <p className="text-danger">{errors[attribute].message}</p>
            )}
          </div>
        ))}
        
        <button type="submit" className="btn btn-primary">
          Predict Market Value
        </button>
      </form>
      
      {predictedValue && <ResultDisplay predictedValue={predictedValue} />}
    </div>
  );
}

export default PlayerForm;