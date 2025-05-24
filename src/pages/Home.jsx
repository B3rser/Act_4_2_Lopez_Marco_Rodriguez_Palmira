import { useEffect, useRef } from 'react';

/**
 * @fileoverview Este módulo define el componente `Home`, que es la página de inicio
 * de la aplicación. Se compone de dos secciones, una donde se le sugiere al usuario ir
 * a buscar y comparar universidades y carreras en el sistema, y otra sección donde
 * se hablan sobre algunos aspectos que tiene el sistema (cantidad de carreras analizadas,
 * test vocacionales y asesorías personalizadas).
 */

/**
 * Componente funcional `Home`.
 *
 * Este componente representa la página principal de la aplicación.
 *
 * @returns {JSX.Element}
 */
export function Home() {
  const buttonRef = useRef(null);

  /**
   * `useEffect` Hook:
   * Este efecto se ejecuta una vez después del montaje inicial del componente.
   * Su propósito es asignar una función `onClick` al elemento del botón
   * referenciado por `buttonRef`. Cuando el botón es clickeado, se imprime
   * un mensaje en la consola.
   */
  useEffect(() => {
    // Asegurarse de que buttonRef.current exista antes de intentar acceder a sus propiedades.
    if (buttonRef.current) {
      buttonRef.current.onclick = () => {
        console.log('Botón "Compara" clickeado');
      };
    }
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar.

  return (
    <>
      {/*
        Bloque de estilos CSS incrustados directamente en el componente.
        Define la apariencia general de la página y los componentes
        que contiene.
      */}
      <style>
        {`
          body, html {
            margin:0;
            padding: 0;
          }
            
          .home-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Segoe UI', sans-serif;
            padding: 0;
            margin: 0;
          }

          .hero-section {
            position: relative;
            width: 100vw;
            height: 540px;
            background-image: url('https://www.liderempresarial.com/wp-content/uploads/2023/10/UASLP-reconocimiento-Instituciones-Ingenieria-Mexico.png');
            background-size: cover;
            background-position: center;
            overflow: hidden;
            margin-bottom: 80px;
          }

          .hero-section::before {
            content: "";
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.6);  
            z-index: 1;
          }

          .hero-content {
            position: absolute;
            top: 0;
            left: 119px;
            width: 1011px;
            height: 100%;

            display: flex;
            flex-direction: column;
            align-items: flex-start;  
            justify-content: center;

            color: white;
            padding: 20px;
            text-align: left;
            z-index: 2;
          }

          .hero-content h1 {
            font-size: 1.5rem;
            margin-bottom: 20px;
            max-width: 90%;
          }

          .cards-section {
            display: flex;
            justify-content: space-between;
            gap: 20px;

            padding: 0 50px;
            width: 100%;
            box-sizing: border-box;

            flex-wrap: wrap;
            margin-bottom: 80px;
          }

        `}
      </style>

      {/* Contenedor principal de la página de inicio */}
      <div className="home-container">
        {/* Sección de Héroe: Banner principal con imagen de fondo y contenido destacado */}
        <div className="hero-section">
          <div className="hero-content">
            <x-typography component='h2' font-family='Montserrat'>
              Te ayudamos a tomar decisiones informadas sobre tu educación superior.
              Encuentra la universidad y carrera ideal en un solo lugar
            </x-typography>
            {/* Boton que quizas deba encargarse de redirigir al usuario a alguna pagina de comparacion o busqueda */}
            <x-button ref={buttonRef} priority="button-icon" label="Compara carreras y universidades" state="default" />
          </div>
        </div>

        {/* Sección de Tarjetas: Muestra características clave de la aplicación */}
        <div className="cards-section">
          <x-textcard2 icon="analyze" description="+500 carreras y universidades analizadas" />
          <x-textcard2 icon="result" description="Test vocacional con resultados personalizados" />
          <x-textcard2 icon="chat" description="Asesoría de mentores profesionales" />
        </div>
      </div>
    </>
  );
}