import React, { CSSProperties, useState } from 'react';
import { DotLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size = 150 }: LoadingSpinnerProps) => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState('#66bb6a');

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
  };

  return (
    <div className="sweet-loading">
      <DotLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
