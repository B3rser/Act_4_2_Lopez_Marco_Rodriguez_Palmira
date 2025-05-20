import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './components/xbutton.jsx';
import './components/x-textcard.jsx'
import './components/x-card.jsx';
import App from './App.jsx';
import './components/x-typography.jsx';
import './components/x-icon.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
