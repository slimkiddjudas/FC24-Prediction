import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calculator, Sparkles, User, Activity, AlertCircle, CheckCircle } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);

  // Attribute configuration with realistic default values
  const attributeConfig = {
    age: { min: 15, max: 40, defaultValue: 22 },
    height_cm: { min: 155, max: 210, defaultValue: 180 },
    weight_kg: { min: 50, max: 120, defaultValue: 75 },
    
    // Special ratings defaults
    weak_foot: { min: 1, max: 5, defaultValue: 3 },
    skill_moves: { min: 1, max: 5, defaultValue: 3 },
    international_reputation: { min: 1, max: 5, defaultValue: 2 },
    
    // Main attributes (0-100)
    pace: { min: 0, max: 100, defaultValue: 70 },
    shooting: { min: 0, max: 100, defaultValue: 65 },
    passing: { min: 0, max: 100, defaultValue: 70 },
    dribbling: { min: 0, max: 100, defaultValue: 68 },
    defending: { min: 0, max: 100, defaultValue: 55 },
    physic: { min: 0, max: 100, defaultValue: 72 },
    
    // Attacking attributes
    attacking_crossing: { min: 0, max: 100, defaultValue: 65 },
    attacking_finishing: { min: 0, max: 100, defaultValue: 60 },
    attacking_heading_accuracy: { min: 0, max: 100, defaultValue: 58 },
    attacking_short_passing: { min: 0, max: 100, defaultValue: 72 },
    attacking_volleys: { min: 0, max: 100, defaultValue: 55 },
    
    // Skill attributes
    skill_dribbling: { min: 0, max: 100, defaultValue: 68 },
    skill_curve: { min: 0, max: 100, defaultValue: 62 },
    skill_fk_accuracy: { min: 0, max: 100, defaultValue: 58 },
    skill_long_passing: { min: 0, max: 100, defaultValue: 65 },
    skill_ball_control: { min: 0, max: 100, defaultValue: 70 },
    
    // Movement attributes
    movement_acceleration: { min: 0, max: 100, defaultValue: 70 },
    movement_sprint_speed: { min: 0, max: 100, defaultValue: 68 },
    movement_agility: { min: 0, max: 100, defaultValue: 65 },
    movement_reactions: { min: 0, max: 100, defaultValue: 70 },
    movement_balance: { min: 0, max: 100, defaultValue: 68 },
    
    // Power attributes
    power_shot_power: { min: 0, max: 100, defaultValue: 70 },
    power_jumping: { min: 0, max: 100, defaultValue: 65 },
    power_stamina: { min: 0, max: 100, defaultValue: 75 },
    power_strength: { min: 0, max: 100, defaultValue: 72 },
    power_long_shots: { min: 0, max: 100, defaultValue: 60 },
    
    // Mentality attributes
    mentality_aggression: { min: 0, max: 100, defaultValue: 65 },
    mentality_interceptions: { min: 0, max: 100, defaultValue: 58 },
    mentality_positioning: { min: 0, max: 100, defaultValue: 68 },
    mentality_vision: { min: 0, max: 100, defaultValue: 65 },
    mentality_penalties: { min: 0, max: 100, defaultValue: 60 },
    mentality_composure: { min: 0, max: 100, defaultValue: 68 },
    
    // Defending attributes
    defending_marking_awareness: { min: 0, max: 100, defaultValue: 55 },
    defending_standing_tackle: { min: 0, max: 100, defaultValue: 58 },
    defending_sliding_tackle: { min: 0, max: 100, defaultValue: 55 },
    
    // Goalkeeping attributes (lower defaults for outfield players)
    goalkeeping_diving: { min: 0, max: 100, defaultValue: 15 },
    goalkeeping_handling: { min: 0, max: 100, defaultValue: 15 },
    goalkeeping_kicking: { min: 0, max: 100, defaultValue: 20 },
    goalkeeping_positioning: { min: 0, max: 100, defaultValue: 15 },
    goalkeeping_reflexes: { min: 0, max: 100, defaultValue: 15 },
    goalkeeping_speed: { min: 0, max: 100, defaultValue: 20 },
    
    default: { min: 0, max: 100, defaultValue: 55 }
  };

  // Helper for formatting attribute names
  const formatAttributeName = (attr) => attr
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Build Zod schema dynamically based on attributes
  const createFormSchema = () => {
    const baseSchema = {
      position: z.string().min(1, "Position is required"),
      foot: z.string().min(1, "Preferred foot is required"),
      work_rate: z.string().min(1, "Work rate is required"),
    };
    
    attributes.forEach(attr => {
      if (['player_positions', 'preferred_foot', 'work_rate'].includes(attr)) {
        return;
      }
      
      const config = attributeConfig[attr] || attributeConfig.default;
      
      baseSchema[attr] = z.preprocess(
        val => val === '' ? undefined : Number(val),
        z.number({
          invalid_type_error: `${formatAttributeName(attr)} must be a number`
        })
        .int(`${formatAttributeName(attr)} must be an integer`)
        .min(config.min, `${formatAttributeName(attr)} must be at least ${config.min}`)
        .max(config.max, `${formatAttributeName(attr)} must be no more than ${config.max}`)
        .optional()
        .or(z.literal(''))
      );
    });
    
    return z.object(baseSchema);
  };

  const formSchema = createFormSchema();

  // Create default values for all attributes
  const createDefaultValues = () => {
    const defaults = {
      position: 'CM', // Central Midfielder as default
      foot: 'Right', // Right foot as default
      work_rate: 'Medium/Medium', // Balanced work rate as default
    };
    
    // Add all attributes with their default values
    attributes.forEach(attr => {
      if (!['player_positions', 'preferred_foot', 'work_rate'].includes(attr)) {
        const config = attributeConfig[attr] || attributeConfig.default;
        defaults[attr] = config.defaultValue.toString();
      }
    });
    
    return defaults;
  };

  const defaultValues = createDefaultValues();
  
  const { 
    handleSubmit, 
    setValue, 
    watch,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  });

  const watchedPosition = watch('position');
  const watchedFoot = watch('foot');
  const watchedWorkRate = watch('work_rate');

  const handlePositionChange = (position) => {
    setValue('position', position, { shouldValidate: true });
    
    // Position'a göre bazı değerleri ayarla
    if (position === 'GK') {
      // Kaleci için özel değerler
      setValue('goalkeeping_diving', '75');
      setValue('goalkeeping_handling', '78');
      setValue('goalkeeping_kicking', '65');
      setValue('goalkeeping_positioning', '72');
      setValue('goalkeeping_reflexes', '80');
      setValue('goalkeeping_speed', '55');
      setValue('defending', '25');
      setValue('shooting', '20');
      setValue('dribbling', '35');
    } else if (position === 'CB') {
      // Stoper için özel değerler
      setValue('defending', '80');
      setValue('physic', '85');
      setValue('defending_marking_awareness', '82');
      setValue('defending_standing_tackle', '78');
      setValue('pace', '55');
      setValue('dribbling', '45');
    } else if (position === 'ST') {
      // Forvet için özel değerler
      setValue('shooting', '85');
      setValue('attacking_finishing', '82');
      setValue('pace', '78');
      setValue('defending', '25');
    }
    
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

  const handleAttributeChange = (attribute, value) => {
    setValue(attribute, value, { shouldValidate: true });
    setPredictedValue(null);
    setApiError(null);
  };
  
  // Handle form submission
  const onSubmit = async (data) => {
    try {
      console.log('Form data received:', data);
      
      // Create payload for API
      const payload = {};
      
      // Önce pozisyon kontrolü yap
      if (!data.position) {
        throw new Error('Position is required');
      }
      
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
      console.log('Selected position:', data.position);
      console.log('Position mapping:', positionMapping[data.position]);
      
      // Pozisyon mapping'ini kontrol et - ESLint hatası düzeltildi
      if (!(data.position in positionMapping)) {
        throw new Error(`Invalid position selected: ${data.position}`);
      }
      
      payload.player_positions = positionMapping[data.position];
      
      if (data.foot) {
        console.log('Selected foot:', data.foot);
        console.log('Foot mapping:', footMapping[data.foot]);
        
        // ESLint hatası düzeltildi
        if (!(data.foot in footMapping)) {
          throw new Error(`Invalid foot selected: ${data.foot}`);
        }
        payload.preferred_foot = footMapping[data.foot];
      } else {
        // Varsayılan değer ata
        payload.preferred_foot = footMapping['Right']; // veya Left
      }
      
      if (data.work_rate) {
        console.log('Selected work rate:', data.work_rate);
        console.log('Work rate mapping:', workRateMapping[data.work_rate]);
        
        // ESLint hatası düzeltildi
        if (!(data.work_rate in workRateMapping)) {
          throw new Error(`Invalid work rate selected: ${data.work_rate}`);
        }
        payload.work_rate = workRateMapping[data.work_rate];
      } else {
        // Varsayılan değer ata
        payload.work_rate = workRateMapping['Medium/Medium'];
      }
      
      console.log('Final payload being sent to API:', payload);
      console.log('Position code being sent:', payload.player_positions);
      
      // Call API
      setIsLoading(true);
      const result = await predictMarketValue(payload);
      console.log('API response:', result);
      setPredictedValue(result);
      setApiError(null);
    } catch (error) {
      console.error('API error:', error);
      setApiError(`Error: ${error.message}`);
      setPredictedValue(null);
    } finally {
      setIsLoading(false);
    }
  };

  const ratingAttributes = ['weak_foot', 'skill_moves', 'international_reputation'];
  const filteredAttributes = attributes.filter(attr => 
    !['player_positions', 'preferred_foot', 'work_rate'].includes(attr) &&
    !ratingAttributes.includes(attr)
  );

  // Group attributes by category for better organization
  const physicalAttributes = ['age', 'height_cm', 'weight_kg'];
  const skillAttributes = filteredAttributes.filter(attr => !physicalAttributes.includes(attr));

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Main Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">Player Market Value Prediction</h2>
          <Sparkles className="w-8 h-8 text-purple-600" />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          All fields are pre-filled with realistic default values. Adjust them as needed for your player.
        </p>
      </div>

      {/* Error Display */}
      {apiError && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{apiError}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Information */}
          <div className="space-y-6">
            {/* Player Position & Basic Info */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <User className="w-5 h-5" />
                  Player Information
                </CardTitle>
                <CardDescription>
                  Player's position and basic characteristics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <PositionSelector 
                    selectedPosition={watchedPosition} 
                    onPositionChange={handlePositionChange}
                  />
                  {errors.position && (
                    <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                  )}
                </div>
                
                <div>
                  <FootSelector 
                    selectedFoot={watchedFoot} 
                    onFootChange={handleFootChange} 
                  />
                  {errors.foot && (
                    <p className="text-red-500 text-sm mt-1">{errors.foot.message}</p>
                  )}
                </div>
                
                <div>
                  <WorkRateSelector 
                    selectedWorkRate={watchedWorkRate} 
                    onWorkRateChange={handleWorkRateChange} 
                  />
                  {errors.work_rate && (
                    <p className="text-red-500 text-sm mt-1">{errors.work_rate.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Physical Attributes */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Activity className="w-5 h-5" />
                  Physical Attributes
                </CardTitle>
                <CardDescription>
                  Player's physical characteristics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {physicalAttributes.map(attribute => (
                  <div key={attribute}>
                    <AttributeInput
                      attribute={attribute}
                      value={watch(attribute) || ''}
                      onChange={(value) => handleAttributeChange(attribute, value)}
                    />
                    {errors[attribute] && (
                      <p className="text-red-500 text-sm mt-1">{errors[attribute].message}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Special Ratings */}
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Sparkles className="w-5 h-5" />
                  Special Ratings
                </CardTitle>
                <CardDescription>
                  Special skills and reputation ratings (1-5 scale)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ratingAttributes.map(attribute => (
                  <div key={attribute}>
                    <RatingSelector
                      attribute={attribute}
                      value={watch(attribute) || ''}
                      onChange={(value) => handleAttributeChange(attribute, value)}
                    />
                    {errors[attribute] && (
                      <p className="text-red-500 text-sm mt-1">{errors[attribute].message}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Skill Attributes */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Activity className="w-5 h-5" />
                  Skill Attributes
                </CardTitle>
                <CardDescription>
                  Player's technical and mental abilities (0-100 scale)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                  {skillAttributes.map(attribute => (
                    <div key={attribute}>
                      <AttributeInput
                        attribute={attribute}
                        value={watch(attribute) || ''}
                        onChange={(value) => handleAttributeChange(attribute, value)}
                      />
                      {errors[attribute] && (
                        <p className="text-red-500 text-sm mt-1">{errors[attribute].message}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prediction Button */}
            <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
              <CardContent className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Calculating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Predict Market Value
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Result Display */}
            {predictedValue && (
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-6 h-6" />
                    Prediction Result
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResultDisplay predictedValue={predictedValue} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlayerForm;
