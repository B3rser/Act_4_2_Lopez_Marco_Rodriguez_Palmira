import { useEffect, useRef } from 'react';

export function Home() {
  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.onClick = () => {
      console.log('Botón "Compara" clickeado');
    };
  }, []);

  return (
    <>
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

      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>
              Te ayudamos a tomar decisiones informadas sobre tu educación superior.
              Encuentra la universidad y carrera ideal en un solo lugar
            </h1>
            <x-button ref={buttonRef} priority="button-icon" label="Compara carreras y universidades" state="default" />
          </div>
        </div>

        {/* Cards Section */}
        <div className="cards-section">
          <x-textcard2 icon="analyze" description="+500 carreras y universidades analizadas" />
          <x-textcard2 icon="result" description="Test vocacional con resultados personalizados" />
          <x-textcard2 icon="chat" description="Asesoría de mentores profesionales" />
        </div>
      </div>
    </>
  );
}
