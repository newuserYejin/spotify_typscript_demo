import React, { CSSProperties, useState } from 'react';
import { DotLoader } from 'react-spinners';

const LoadingSpinner = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState('red');

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
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingSpinner;
