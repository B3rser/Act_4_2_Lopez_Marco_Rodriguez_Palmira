import React, { useEffect, useRef } from 'react';

/**
 * @fileoverview Este módulo define el componente React `Components`, una página de demostración
 * que muestra el uso e interacción de varios Web Components personalizados (`x-typography`, `x-icon`,
 * `x-button`, `x-card`, `x-textcard`, `x-textcard2`, `x-input`, `x-dropdown`).
 * Este componente es útil para probar visualmente la funcionalidad de cada Web Component
 * y su integración con React.
 */

/**
 * `Components` (Componente React)
 *
 * Este componente funcional de React sirve como una página de demostración interactiva
 * para visualizar y probar los diferentes Web Components desarrollados en la aplicación.
 * Muestra ejemplos de uso de tipografía, íconos, botones con distintas prioridades,
 * diferentes tipos de tarjetas y componentes de entrada de datos (input y dropdown),
 * incluyendo cómo manejar eventos y sincronizar datos entre React y los Custom Elements.
 *
 * @export
 * @returns {JSX.Element}
 * @example
 * // Este componente se utilizaría principalmente para desarrollo y pruebas:
 * <Components />
 */
export function Components() {
  // Estado para el valor del input de correo electrónico
  const [email, setEmail] = React.useState('');

  /**
   * Manejador de cambios para el input de correo electrónico.
   * Actualiza el estado `email` con el nuevo valor del input.
   * Se adapta para recibir el valor tanto del evento de cambio nativo (`event.target.value`)
   * como del `CustomEvent` despachado por `x-input` (`event.detail.value`).
   * @param {Event} event - El evento de cambio.
   */
  const handleEmailInputChange = (event) => {
    setEmail(event.detail ? event.detail.value : event.target.value);
  };

  // Estado para el valor seleccionado del dropdown
  const [selectedDropdownValue, setSelectedDropdownValue] = React.useState('');

  /**
   * Manejador de cambios para el componente `x-dropdown`.
   * Registra el valor y la etiqueta seleccionados en la consola y actualiza el estado `selectedDropdownValue`.
   * @param {CustomEvent} event - El evento personalizado de cambio despachado por `x-dropdown`.
   */
  const handleDropdownChange = (event) => {
    console.log(event)
    const newValue = event.detail.value;
    const newLabel = event.detail.label;
    console.log('Dropdown selected:', newValue, newLabel);
    setSelectedDropdownValue(newValue);
  };

  // Opciones para el componente `x-dropdown`
  const careerOptions = [
    { value: 'software_eng', label: 'Ingeniería de Software' },
    { value: 'data_science', label: 'Ciencia de Datos' },
    { value: 'cyber_sec', label: 'Ciberseguridad' },
    // Los strings planos también son aceptados por x-dropdown, pero se recomienda el formato { value, label }
    'Marketing Digital',
    'Diseño Gráfico'
  ];

  /**
   * Manejador de clic para el botón de demostración.
   * Muestra una alerta simple cuando el botón es presionado.
   */
  const handleClick = () => {
    alert('¡Botón presionado!');
  };

  // `useEffect` para asignar el manejador de clic al primer `x-button` renderizado en el DOM.
  // Esto demuestra cómo adjuntar eventos a Custom Elements fuera del ciclo de vida de React.
  React.useEffect(() => {
    const btn = document.querySelector('x-button');
    if (btn) { // Asegura que el botón exista antes de intentar adjuntar el manejador
      btn.onClick = handleClick;
    }
  }, []); // Se ejecuta una sola vez al montar el componente.

  // Referencia para el componente `x-card` para adjuntar un manejador de eventos.
  const cardRef = useRef(null);

  // `useEffect` para asignar un manejador de clic al `x-card` referenciado.
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.onClick = () => {
        alert('¡Botón clickeado desde React!');
      };
    }
  }, []); // Se ejecuta una sola vez al montar el componente.

  // Referencia para el componente `x-textcard` para adjuntar un manejador de eventos.
  const textCardRef = useRef(null);
  // `useEffect` para asignar un manejador de clic al `x-textcard` referenciado.
  useEffect(() => {
    if (textCardRef.current) {
      textCardRef.current.onClick = () => {
        alert('¡Haz hecho clic en el botón del TextCard!');
      };
    }
  }, []); // Se ejecuta una sola vez al montar el componente.

  return (
    <div>
      <div>components</div>

      {/* Ejemplos de x-typography */}
      <x-typography component='h1' font-family='Montserrat' >
        Montserrat1
      </x-typography>

      <x-typography component='h1' font-family='Roboto'>
        Montserrat2
      </x-typography>

      <x-typography component='h1' font-family='DM Sans' >
        Montserrat3
      </x-typography>

      {/* Ejemplos de x-icon con diferentes nombres */}
      <div>
        <x-icon name="home" size={20} ></x-icon>
        <x-icon name="help" size={20} ></x-icon>
        <x-icon name="success" size={20} ></x-icon>
        <x-icon name="error" size={20} ></x-icon>
        <x-icon name="arrow-right" size={20} ></x-icon>
        <x-icon name="cross" size={20} ></x-icon>
        <x-icon name="arrow-left" size={20} ></x-icon>
        <x-icon name="menu" size={20} ></x-icon>
        <x-icon name="edit" size={20} ></x-icon>
        <x-icon name="dropdown" size={20} ></x-icon>
        <x-icon name="bell" size={20} ></x-icon>
        <x-icon name="pin" size={20} ></x-icon>
        <x-icon name="download" size={20} ></x-icon>
        <x-icon name="bar-chart" size={20} ></x-icon>
        <x-icon name="inbox" size={20} ></x-icon>
        <x-icon name="filter" size={20} ></x-icon>
        <x-icon name="map" size={20} ></x-icon>
        <x-icon name="zap" size={20} ></x-icon>
        <x-icon name="share" size={20} ></x-icon>
        <x-icon name="credit-card" size={20} ></x-icon>
        <x-icon name="search" size={20} ></x-icon>
        <x-icon name="user" size={20} ></x-icon>
        <x-icon name="calendar" size={20} ></x-icon>
        <x-icon name="eye" size={20} ></x-icon>
        <x-icon name="closed-eye" size={20} ></x-icon>
        <x-icon name="heart" size={20} ></x-icon>
        <x-icon name="caret-right" size={20} ></x-icon>
        <x-icon name="analyze" size={20} ></x-icon>
        <x-icon name="chat" size={20} ></x-icon>
        <x-icon name="result" size={20} ></x-icon>
        <x-icon name="x" size={20} ></x-icon>
        <x-icon name="instagram" size={20} ></x-icon>
        <x-icon name="facebook" size={20} ></x-icon>
        <x-icon name="tiktok" size={20} ></x-icon>
      </div>

      {/* Ejemplos de las variantes de x-button */}
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
        <x-button
          label="Siguiente"
          priority="button-icon"
        ></x-button>
      </div>

      {/* Ejemplos de x-card con diferentes tipos y manejadores de clic */}
      <div>
        <x-card
          ref={cardRef} // Asocia la referencia para manejar el clic desde React
          type="universidad"
          image="https://wp.uaslp.mx/noticias/wp-content/uploads/sites/5/2024/04/thumbnail_UASLP-1024x682.jpg"
          title="uaslp"
          content="jdeneodoekde"
          buttonPriority='alternative-card'
          buttonLabel='Ver más'>
        </x-card>
      </div>
      <div>
        <x-card
          type="carrera"
          image="https://wp.uaslp.mx/noticias/wp-content/uploads/sites/5/2024/04/thumbnail_UASLP-1024x682.jpg"
          title="uaslp"
          content="jdeneodoekde jsbibsbwuibsuiw"
          buttonPriority='secondary'
          buttonLabel='Ver más'>
        </x-card>
      </div>

      {/* Ejemplos de x-textcard */}
      <div>
        <x-textcard
          icon="user"
          label="Título de la tarjeta"
          description="Descripción de la tarjeta."
          type="default"
          buttonpriority="primary"
          buttonlabel="Haz clic"
        />
      </div>
      <div>
        <x-textcard
          ref={textCardRef} // Asocia la referencia para manejar el clic del botón desde React
          label="Perfil"
          description="Accede a tu perfil de usuario"
          type="card-boton"
          buttonpriority="button-icon"
          buttonlabel="Ver más"
          icon="user"
        ></x-textcard>
      </div>

      {/* Ejemplo de x-textcard2 (tarjeta de ícono y texto con clic en toda la tarjeta) */}
      <div>
        <x-textcard2
          icon="home"
          description="Ir al inicio"
        ></x-textcard2>
      </div>

      {/* Ejemplo de x-input (campo de entrada de texto) */}
      <x-input
        label="Correo Electrónico"
        placeholder="Tu correo aquí..."
        value={email} // Controla el valor del input desde el estado de React
        onchange={(e) => handleEmailInputChange(e)} // Maneja el evento de cambio
      ></x-input>

      {/* Ejemplo de x-dropdown (menú desplegable) */}
      <x-dropdown
        placeholder="Selecciona una Carrera"
        options={careerOptions} // Pasa las opciones definidas
        value={selectedDropdownValue} // Controla el valor seleccionado desde el estado de React
        onchange={handleDropdownChange} // Maneja el evento de cambio
      ></x-dropdown>

      {/* Muestra el valor seleccionado del dropdown */}
      <p>Carrera seleccionada: {selectedDropdownValue}</p>

    </div>

  );
}
