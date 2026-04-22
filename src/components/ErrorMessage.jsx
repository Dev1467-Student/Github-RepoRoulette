import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ title, message }) => (
  <div className="glass-card text-center fade-in" style={{ borderColor: '#ef4444' }}>
    <AlertCircle size={48} color="#ef4444" className="mx-auto mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted">{message}</p>
  </div>
);

export default ErrorMessage;
