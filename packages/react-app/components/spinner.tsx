import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Spinner() {
  return (
    <div style={{ width: '50px', margin: 'auto', display: 'block' }}>
      <ClipLoader className="bg-pa_two" size={50}/>
    </div>
  );
};
