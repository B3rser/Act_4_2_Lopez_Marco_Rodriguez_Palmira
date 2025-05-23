import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './components/x-typography.jsx';
import './components/x-icon.jsx';
import './components/x-button.jsx';
import './components/x-textcard.jsx'
import './components/x-card.jsx';
import './components/x-textcard2.jsx';
import './components/x-header.jsx';
import './components/x-footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
