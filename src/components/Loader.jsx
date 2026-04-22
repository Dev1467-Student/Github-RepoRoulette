import React from 'react';
import { RefreshCw } from 'lucide-react';

const Loader = ({ text, size = 48 }) => (
  <div className="flex flex-col items-center justify-center py-12 fade-in">
    <RefreshCw className="spinner mb-4" size={size} color="var(--primary-color)" />
    {text && <p className="text-muted">{text}</p>}
  </div>
);

export default Loader;
