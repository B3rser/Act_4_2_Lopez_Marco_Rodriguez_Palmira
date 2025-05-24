import ReactDOM from 'react-dom/client';
import cardCSS from './css/x-card.css?inline';
import React, { useEffect, useRef } from 'react'; // Importa el CSS como una string

/**
 * @fileoverview Este módulo define el Web Component `x-card` y el componente React `Card`
 * que lo alimenta. `x-card` actúa como un envoltorio para integrar la funcionalidad de React
 * dentro de un Custom Element, permitiendo su uso en HTML estándar y proporcionando una interfaz
 * de propiedades y eventos nativa de Web Components.
 */

/**
 * `Card` (Componente React)
 *
 * Este componente funcional de React renderiza una tarjeta de contenido flexible.
 * Permite mostrar una imagen, título, texto y un botón personalizable,
 * adaptando su estilo y comportamiento según el tipo de tarjeta y las propiedades recibidas.
 *
 * @param {object} props - Las propiedades que recibe el componente.
 * @param {string} [props.type='universidad'] - Define la variante visual de la tarjeta. Se usa para clases CSS.
 * @param {string} props.image - La URL de la imagen que se mostrará en la tarjeta.
 * @param {string} props.title - El título principal de la tarjeta.
 * @param {string} props.content - El contenido textual principal de la tarjeta.
 * @param {string} [props.buttonPriority='alternative-card'] - Define la variante visual del botón interno.
 * @param {string} [props.buttonLabel='Ver más'] - El texto que se mostrará en el botón de la tarjeta.
 * @param {Function} props.onButtonClick - Función de callback que se ejecuta cuando el botón de la tarjeta es clickeado.
 * @returns {JSX.Element}
 */
const Card = ({
  type = 'universidad',
  image,
  title,
  content,
  buttonPriority = 'alternative-card',
  buttonLabel = 'Ver más',
  onButtonClick,
}) => {
  // `useRef` para obtener una referencia al Custom Element `x-button` renderizado.
  const buttonRef = useRef(null);

  // `useEffect` para asignar la función `onButtonClick` al `onClick` del `x-button`
  // una vez que el componente ha sido montado y `onButtonClick` esté disponible.
  useEffect(() => {
    if (buttonRef.current && onButtonClick) {
      // Asigna la función de callback directamente a la propiedad `onClick` del Custom Element.
      buttonRef.current.onClick = onButtonClick;
    }
  }, [onButtonClick]); // Se re-ejecuta si `onButtonClick` cambia.

  // Construye las clases CSS dinámicamente para aplicar los estilos correctos según el tipo de tarjeta.
  const cardClass = `card ${type}`;

  return (
    <div className={cardClass}>
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{content}</p>
        <div className="card-button">
          {/* Renderiza el Custom Element `x-button`.
              `ref` se usa para acceder a la instancia del DOM del `x-button` para poder asignarle el `onClick`.
              Las demás propiedades son pasadas directamente como atributos. */}
          <x-button
            ref={buttonRef}
            priority={buttonPriority}
            state="default"
            label={buttonLabel}
          />
        </div>
      </div>
    </div>
  );
};

// Web Component `XCard`

/**
 * `XCard`
 *
 * Esta clase extiende `HTMLElement` para crear un Custom Element (`<x-card>`).
 * Actúa como un puente entre el HTML estándar y el componente React `Card`.
 * Gestiona los atributos HTML y propiedades del Custom Element, y renderiza el componente React
 * dentro de su Shadow DOM. Permite configurar la imagen, título, contenido, el botón y el
 * comportamiento de clic de la tarjeta desde HTML o JavaScript nativo.
 *
 * @extends HTMLElement
 */
class XCard extends HTMLElement {
  /**
   * Propiedad estática `observedAttributes`.
   * Define qué atributos HTML el Custom Element observará para cambios.
   * Cuando uno de estos atributos cambia, se invoca `attributeChangedCallback`.
   * Los nombres de los atributos se convierten a minúsculas automáticamente.
   * @static
   * @readonly
   * @type {string[]}
   */
  static get observedAttributes() {
    return ['type', 'image', 'title', 'content', 'buttonpriority', 'buttonlabel'];
  }

  /**
   * Constructor de la clase `XCard`.
   * Inicializa el estado interno para las propiedades del Custom Element (`_props`),
   * adjunta el Shadow DOM, inyecta los estilos CSS y crea un punto de montaje para React.
   */
  constructor() {
    super();
    this._props = {}; // Objeto para almacenar las propiedades del Custom Element.
    this._root = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsulación.

    // Inyecta los estilos CSS de la tarjeta en el Shadow DOM.
    const style = document.createElement('style');
    style.textContent = cardCSS;
    this._root.appendChild(style);

    // Crea un div que servirá como punto de montaje para el componente React.
    this._mountPoint = document.createElement('div');
    this._root.appendChild(this._mountPoint);

    // Crea la raíz de React para renderizar el componente Card.
    this._reactRoot = ReactDOM.createRoot(this._mountPoint);
  }

  /**
   * `connectedCallback`.
   * Se invoca cuando el Custom Element es añadido al DOM.
   * En este punto, se realiza el primer renderizado del componente React
   * y se adjunta un listener para el evento 'click' en el Shadow DOM.
   * Este listener delega el evento para detectar clics en el `x-button` interno
   * y ejecutar la función `onClick` si está definida.
   */
  connectedCallback() {
    // Agrega un listener de clic al punto de montaje del Shadow DOM.
    // Esto permite capturar eventos de clic que burbujean desde elementos internos.
    this._mountPoint.addEventListener('click', (e) => {
      // Verifica si el elemento que originó el clic es un `x-button` y si hay una función `onClick` definida.
      if (e.target.tagName === 'X-BUTTON' && this._props.onClick) {
        this._props.onClick(e); // Ejecuta la función de callback `onClick`.
      }
    });

    this._render(); // Realiza el renderizado inicial del componente React.
  }

  /**
   * `attributeChangedCallback`.
   * Se invoca cuando uno de los atributos definidos en `observedAttributes` cambia.
   * Actualiza la propiedad interna correspondiente (normalizando el nombre del atributo a minúsculas)
   * y fuerza un re-renderizado del componente React para reflejar el cambio en la UI.
   *
   * @param {string} name - El nombre del atributo que cambió.
   * @param {string|null} oldValue - El valor anterior del atributo. No se usa directamente aquí.
   * @param {string|null} newValue - El nuevo valor del atributo.
   */
  attributeChangedCallback(name, _, newValue) {
    // Convierte el nombre del atributo a minúsculas para que coincida con las propiedades de React.
    this._props[name.toLowerCase()] = newValue;
    this._render(); // Re-renderiza el componente React.
  }

  /**
   * Setter para la propiedad `onClick`.
   * Permite asignar una función de callback que se ejecutará cuando el botón interno de la tarjeta sea clickeado.
   * Esta función se pasará al componente React `Card` como `onButtonClick`.
   *
   * @param {Function} fn - La función de callback a ejecutar en el clic del botón.
   */
  set onClick(fn) {
    // Se espera que 'fn' sea una función. Se asigna directamente.
    this._props.onClick = fn;
    this._render(); // Re-renderiza para que el componente React reciba el nuevo `onButtonClick`.
  }

  /**
   * `_render` (Método Interno).
   * Este método privado es responsable de renderizar el componente `Card` de React
   * dentro del Shadow DOM del Custom Element, pasándole todas las propiedades actuales.
   * Lee las propiedades (type, image, title, content, buttonPriority, buttonLabel, onClick)
   * del objeto `_props`.
   */
  _render() {
    // Destructura las propiedades necesarias del estado interno.
    const {
      type,
      image,
      title,
      content,
      buttonpriority,
      buttonlabel,
      onClick,
    } = this._props;

    this._reactRoot.render(
      <Card
        type={type}
        image={image}
        title={title}
        content={content}
        buttonPriority={buttonpriority}
        buttonLabel={buttonlabel}
        onButtonClick={onClick}
      />
    );
  }
}

// Define el Custom Element 'x-card' en el navegador, asociándolo con la clase XCard.
customElements.define('x-card', XCard);
