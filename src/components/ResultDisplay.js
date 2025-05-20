import React from 'react';

function ResultDisplay({ predictedValue }) {
  return (
    <div className="result-display">
      <h2>Predicted Market Value</h2>
      {predictedValue && predictedValue.predicted_value_eur !== undefined ? (
        <p>
          The estimated market value is:{' '}
          <strong>
            €{predictedValue.predicted_value_eur.toLocaleString('en-US')}
          </strong>
        </p>
      ) : (
        <p>Please enter player attributes to see the predicted market value.</p>
      )}
    </div>
  );
}

export default ResultDisplay;