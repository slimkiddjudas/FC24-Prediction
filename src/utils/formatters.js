export function formatInputData(data) {
  // Format the input data for prediction
  return {
    position: data.position,
    attributes: {
      pace: parseFloat(data.pace) || 0,
      shooting: parseFloat(data.shooting) || 0,
      passing: parseFloat(data.passing) || 0,
      dribbling: parseFloat(data.dribbling) || 0,
      defending: parseFloat(data.defending) || 0,
      physical: parseFloat(data.physical) || 0,
    },
  };
}

export function formatMarketValue(value) {
  // Format the market value for display
  return value ? `$${value.toLocaleString()}` : 'N/A';
}