import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/* Imports para todos los web components del sistema */
import './components/x-typography.jsx';
import './components/x-icon.jsx';
import './components/x-button.jsx';
import './components/x-textcard.jsx'
import './components/x-card.jsx';
import './components/x-textcard2.jsx';
import './components/x-header.jsx';
import './components/x-footer.jsx';
import './components/x-input.jsx'; 
import './components/x-dropdown.jsx'; 

/**
 * @fileoverview Este archivo es el punto de entrada principal de la aplicación React.
 * Se encarga de importar todos los web componentes y los estilos globales,
 * y luego renderiza el componente `App` en el DOM, el cual contiene la aplicacion en si.
 */

/**
 * Renderización de la aplicación React.
 *
 * Selecciona el elemento HTML con el ID 'root' en el documento (`div`
 * en `public/index.html`) y crea una raíz de React.
 * Dentro de esta raíz, se renderiza el componente principal `App` envuelto en
 * `<StrictMode>`. Esto se mantiene durante el desarrollo para ayudar a
 * detectar problemas potenciales en React.
 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
