import React from 'react';
import ReactDOM from 'react-dom/client';
import textCardCSS from './css/x-textCard.css?inline'; // Importa el CSS como una string

/**
 * @fileoverview Este módulo define el Web Component `x-textcard` y el componente React `TextCard`
 * que lo alimenta. `x-textcard` actúa como un envoltorio para integrar la funcionalidad de React
 * dentro de un Custom Element, permitiendo su uso en HTML estándar y proporcionando una interfaz
 * de propiedades y eventos nativa de Web Components para tarjetas de texto con botón opcional.
 */

/**
 * `TextCard` (Componente React)
 *
 * Este componente funcional de React renderiza una tarjeta de contenido basada en texto.
 * Puede mostrar un título, una descripción, un ícono opcional junto al título,
 * y un botón condicionalmente, dependiendo del `type` de la tarjeta.
 *
 * @param {object} props - Las propiedades que recibe el componente.
 * @param {string} props.label - El título principal de la tarjeta.
 * @param {string} props.description - La descripción o el contenido textual de la tarjeta.
 * @param {string} [props.type='default'] - Define la variante visual o el comportamiento de la tarjeta.
 * Si es 'card-boton', se mostrará un botón.
 * @param {string} [props.buttonPriority='primary'] - Define la variante visual del botón si se muestra.
 * @param {string} [props.buttonLabel='Ver más'] - El texto que se mostrará en el botón de la tarjeta si se muestra.
 * @param {string} [props.icon] - El nombre del ícono a mostrar junto al título. Debe coincidir con un ícono disponible en `x-icon`. Opcional.
 * @param {Function} [props.onClick] - Función de callback que se ejecuta cuando el botón de la tarjeta es clickeado.
 * @returns {JSX.Element}
 */
const TextCard = ({
  label,
  description,
  type = 'default',
  buttonPriority = 'primary',
  buttonLabel = 'Ver más',
  icon,
}) => {
  return (
    <div className="text-card">
      <h3 className="text-card-title">
        {label}
        {/* Renderiza el ícono solo si la prop 'icon' está presente */}
        {icon && <x-icon name={icon} size="24" style={{ marginLeft: '8px', verticalAlign: 'middle' }} />}
      </h3>
      <p className="text-card-description">{description}</p>
      {/* Muestra el botón solo si el `type` de la tarjeta es 'card-boton' */}
      {type === 'card-boton' && (
        <div className="text-card-button-wrapper">
          <x-button
            priority={buttonPriority}
            state="default"
            label={buttonLabel}
          />
        </div>
      )}
    </div>
  );
};

// Web Component `XTextCard`

/**
 * `XTextCard`
 *
 * Esta clase extiende `HTMLElement` para crear un Custom Element (`<x-textcard>`).
 * Actúa como un puente entre el HTML estándar y el componente React `TextCard`.
 * Gestiona los atributos HTML (`label`, `description`, `type`, `buttonpriority`, `buttonlabel`, `icon`)
 * y la propiedad `onClick` del Custom Element, y los pasa como propiedades al componente React.
 * Permite configurar el contenido y el comportamiento del botón de la tarjeta desde HTML o JavaScript nativo.
 *
 * @extends HTMLElement
 */
class XTextCard extends HTMLElement {
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
    return ['label', 'description', 'type', 'buttonpriority', 'buttonlabel', 'icon'];
  }

  /**
   * Constructor de la clase `XTextCard`.
   * Inicializa el estado interno para las propiedades del Custom Element (`_props`),
   * adjunta el Shadow DOM, inyecta los estilos CSS y crea un punto de montaje para React.
   */
  constructor() {
    super();
    this._props = {}; // Objeto para almacenar las propiedades del Custom Element.
    this._root = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsulación.

    // Inyecta los estilos CSS de la tarjeta de texto en el Shadow DOM.
    const style = document.createElement('style');
    style.textContent = textCardCSS;
    this._root.appendChild(style); // Agrega los estilos al Shadow DOM.

    // Crea un div que servirá como punto de montaje para el componente React.
    this._mountPoint = document.createElement('div');
    this._root.appendChild(this._mountPoint); // Agrega el punto de montaje al Shadow DOM.

    // Crea la raíz de React para renderizar el componente TextCard.
    this._reactRoot = ReactDOM.createRoot(this._mountPoint);
  }

  /**
   * `connectedCallback`.
   * Se invoca cuando el Custom Element es añadido al DOM.
   * En este punto, se adjunta un listener para el evento 'click' en el Shadow DOM.
   * Este listener delega el evento para detectar clics en el `x-button` interno
   * y ejecutar la función `onClick` del Custom Element si está definida.
   * Finalmente, se realiza el primer renderizado del componente React.
   */
  connectedCallback() {
    // Agrega un listener de clic al punto de montaje del Shadow DOM.
    // Esto permite capturar eventos de clic que burbujean desde elementos internos.
    this._mountPoint.addEventListener('click', (e) => {
      // Verifica si el elemento que originó el clic es un `x-button` y si hay una función `onClick` definida en el Custom Element.
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
   * @param {string} name - El nombre del atributo que cambió (ej. 'label', 'type').
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
   * Esta función se pasará al componente React `TextCard` como prop `onClick`.
   *
   * @param {Function} fn - La función de callback a ejecutar en el clic del botón.
   */
  set onClick(fn) {
    // Se espera que 'fn' sea una función. Se asigna directamente.
    this._props.onClick = fn;
    this._render(); // Re-renderiza para que el componente React reciba el nuevo `onClick`.
  }

  /**
   * `_render` (Método Interno).
   * Este método privado es responsable de renderizar el componente `TextCard` de React
   * dentro del Shadow DOM del Custom Element, pasándole todas las propiedades actuales.
   * Lee las propiedades (label, description, type, buttonpriority, buttonlabel, icon, onClick)
   * del objeto `_props`.
   */
  _render() {
    // Destructura las propiedades necesarias del estado interno.
    const {
      label,
      description,
      type,
      buttonpriority,
      buttonlabel,
      icon,
      onClick,
    } = this._props;

    this._reactRoot.render(
      <TextCard
        label={label}
        description={description}
        type={type}
        buttonPriority={buttonpriority}
        buttonLabel={buttonlabel}
        icon={icon}
        onClick={onClick}
      />
    );
  }
}

// Define el Custom Element 'x-textcard' en el navegador, asociándolo con la clase XTextCard.
customElements.define('x-textcard', XTextCard);
