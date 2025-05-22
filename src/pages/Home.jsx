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
            width: 100%;
            max-width: 1447px;
            height:600px;
            background-image: url('https://www.liderempresarial.com/wp-content/uploads/2023/10/UASLP-reconocimiento-Instituciones-Ingenieria-Mexico.png'); 
            background-size: cover;
            background-position: center;
            overflow: hidden;
            margin-bottom: 40px;
          }

          .hero-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: brightness(0.6);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 20px;
            text-align: center;
          }

          .hero-content h1 {
            font-size: 1.5rem;
            margin-bottom: 20px;
            max-width: 90%;
          }

          .cards-section {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }

          x-textcard2 {
            width: 120px;
            height: 180px;
            cursor: pointer;
          }

          x-button {
            margin-top: 10px;
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
            <x-button ref={buttonRef} priority="primary" label="Compara" variant="button-icon" />
          </div>
        </div>

        {/* Cards Section */}
        <div className="cards-section">
          <x-textcard2 icon="school" description="Universidades" />
          <x-textcard2 icon="book" description="Carreras" />
          <x-textcard2 icon="star" description="Favoritos" />
        </div>
      </div>
    </>
  );
}
