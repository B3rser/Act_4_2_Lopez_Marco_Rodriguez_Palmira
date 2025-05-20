import React, { useEffect, useRef } from 'react';

export function Components() {
  const handleClick = () => {
    alert('¡Botón presionado!');
  };

  React.useEffect(() => {
    const btn = document.querySelector('x-button');
    btn.onClick = handleClick;
  }, []);

  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.onClick = () => {
        alert('¡Botón clickeado desde React!');
      };
    }
  }, []);

  const textCardRef = useRef(null);
  useEffect(() => {
    if (textCardRef.current) {
      textCardRef.current.onClick = () => {
        alert('¡Haz hecho clic en el botón del TextCard!');
      };
    }
  }, []);


  return (
    <div>
      <div>
        <x-button label="Clickeame" priority="primary" state="default"></x-button>
      </div>
      <div>
        <x-button label="Clickeame" priority="alternative" state="default"></x-button>
      </div>
      <div>
        <x-button label="Clickeame" priority="secondary" state="default"></x-button>
      </div>
      <div>
        <x-button label="Clickeame" priority="primary" state="disabled"></x-button>
      </div>
      <div>
        <x-button label="Clickeame" priority="alternative" state="disabled"></x-button>
      </div>
      <div>
        <x-button label="Clickeame" priority="secondary" state="disabled"></x-button>
      </div>
      <div>
        <x-card
          ref={cardRef}
          type="universidad"
          image="https://wp.uaslp.mx/noticias/wp-content/uploads/sites/5/2024/04/thumbnail_UASLP-1024x682.jpg"
          title="uaslp"
          content="jdeneodoekde"
          buttonPriority='alternative'
          buttonLabel='Ver más'>
        </x-card>

      </div>
      <div>
        <x-card
          ref={cardRef}
          type="carrera"
          image="https://wp.uaslp.mx/noticias/wp-content/uploads/sites/5/2024/04/thumbnail_UASLP-1024x682.jpg"
          title="uaslp"
          content="jdeneodoekde jsbibsbwuibsuiw"
          buttonPriority='alternative'
          buttonLabel='Ver más'>
        </x-card>

      </div>
      <div>
        <x-textcard
          ref={textCardRef}
          label="Título de la tarjeta"
          description="Descripción de la tarjeta."
          type="default"
          buttonpriority="primary"
          buttonlabel="Haz clic"
        />
      </div>
      <div>
        <x-textcard
          ref={textCardRef}
          label="Título de la tarjeta"
          description="Descripción de la tarjeta."
          type="card-boton"
          buttonpriority="primary"
          buttonlabel="Haz clic"
        />
      </div>

    </div>

  );
}
