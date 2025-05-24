import React from 'react';
import './App.css'; // Estilos para el componente App
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Importación de los componentes de página para las diferentes rutas
import { Components } from './pages/Components';
import { Home } from './pages/Home';
import { ExpUni } from './pages/ExpUni';
import { ExpCarr } from './pages/ExpCarr'; // Página de experiencia de carrera
import { Becas } from './pages/Becas'; // Página de becas
import { Asesorias } from './pages/Asesorias'; // Página de asesorías

/**
 * @fileoverview Este archivo define el componente principal `App` de la aplicación React.
 * Se encarga de configurar el enrutamiento (routing) utilizando `react-router-dom`
 * y de renderizar los componentes de página correspondientes a cada ruta.
 * Incluye un menu horizontal y pie de página que se muestran en todas las rutas.
 */

/**
 * Componente `App`.
 *
 * Este es el componente raíz de la aplicación. Configura la navegación de la
 * aplicación utilizando `BrowserRouter`.
 * Define las distintas rutas (`Routes`) y los componentes (`<x-header>`, `<x-footer>`)
 * que se renderizarán globalmente en la interfaz de usuario.
 * @returns {JSX.Element} 
 */
function App() {
  return (
    // BrowserRouter: Habilita el enrutamiento basado en el historial del navegador.
    <BrowserRouter>
      {/* x-header: Menu horizontal que se muestra en todas las páginas.
          Web Component que no depende de las rutas. */}
      <x-header></x-header>

      {/* Routes: Contenedor para definir todas las rutas de la aplicación.
          Solo la primer ruta que coincida se renderizará. */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/expUni" element={<ExpUni />} />
        <Route path="/expCarr" element={<ExpCarr />} />
        <Route path="/becas" element={<Becas />} />
        <Route path="/asesorias" element={<Asesorias />} />
      </Routes>

      {/* x-footer: Componente de pie de página que se muestra en todas las páginas.
          Web Component que no depende de las rutas. */}
      <x-footer></x-footer>
    </BrowserRouter>
  );
}

export default App;
