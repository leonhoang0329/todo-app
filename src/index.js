import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Simple rendering without any complex logic
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);