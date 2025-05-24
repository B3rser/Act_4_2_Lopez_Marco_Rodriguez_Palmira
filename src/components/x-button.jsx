import React from 'react';
import ReactDOM from 'react-dom/client';
import buttonCSS from './css/x-button.css?inline'; // Importa el CSS como una string

/**
 * @fileoverview Este módulo define el Web Component `x-button` y el componente React `Button`
 * que lo alimenta. `x-button` actúa como un envoltorio para integrar la funcionalidad de React
 * dentro de un Custom Element, permitiendo su uso en HTML estándar y proporcionando una interfaz
 * de propiedades y eventos nativa de Web Components.
 */

/**
 * `Button` (Componente React)
 *
 * Este componente funcional de React renderiza un botón con estilos y comportamientos personalizables.
 * Soporta diferentes prioridades de estilo, estados (habilitado/deshabilitado) y la opción de incluir un ícono.
 *
 * @param {object} props - Las propiedades que recibe el componente.
 * @param {*} props.label - El contenido de texto o JSX que se mostrará dentro del botón.
 * @param {string} [props.priority='primary'] - Define la variante visual del botón (ej. 'primary', 'secondary', 'button-icon').
 * @param {string} [props.state='default'] - Define el estado interactivo del botón (ej. 'default', 'disabled').
 * @param {Function} props.onClick - Función de callback que se ejecuta cuando el botón es clickeado.
 * @returns {JSX.Element}
 */
const Button = ({ label, priority = 'primary', state = 'default', onClick }) => {
  // Determina si el botón debe estar deshabilitado basado en la prop 'state'.
  const isDisabled = state === 'disabled';
  // Determina si el botón es un tipo "botón con ícono" para renderizar el ícono condicionalmente.
  const isIconButton = priority === 'button-icon';
  // Construye las clases CSS dinámicamente para aplicar los estilos correctos.
  const className = `custom-button ${priority} ${state !== 'default' ? state : ''}`;

  return (
    <button
      className={className} // Clases CSS para el estilo y la variante/estado.
      onClick={onClick}     // Manejador del evento clic.
      disabled={isDisabled} // Atributo HTML 'disabled' para deshabilitar el botón.
    >
      <span>{label}</span> {/* El contenido visible del botón. */}
      {/* Renderiza el ícono solo si 'isIconButton' es verdadero. */}
      {isIconButton && <x-icon name="arrow-right" size="16" class="icon-right" color='var(--color-white)' />}
    </button>
  );
};

// Web Component `XButton`

/**
 * `XButton`
 *
 * Esta clase extiende `HTMLElement` para crear un Custom Element (`<x-button>`).
 * Actúa como un puente entre el HTML estándar y el componente React `Button`.
 * Gestiona los atributos HTML y propiedades del Custom Element, y renderiza el componente React
 * dentro de su Shadow DOM. Permite configurar el texto, prioridad, estado y comportamiento de clic
 * del botón desde HTML o JavaScript nativo.
 *
 * @extends HTMLElement
 */
class XButton extends HTMLElement {
  /**
   * Propiedad estática `observedAttributes`.
   * Define qué atributos HTML el Custom Element observará para cambios.
   * Cuando uno de estos atributos cambia, se invoca `attributeChangedCallback`.
   * @static
   * @readonly
   * @type {string[]}
   */
  static get observedAttributes() {
    return ['label', 'priority', 'state'];
  }

  /**
   * Constructor de la clase `XButton`.
   * Inicializa el estado interno para las propiedades del Custom Element (`_props`),
   * adjunta el Shadow DOM, inyecta los estilos CSS y crea un punto de montaje para React.
   */
  constructor() {
    super();
    this._props = {}; // Objeto para almacenar las propiedades del Custom Element.
    this._root = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsulación.

    // Inyecta los estilos CSS del botón en el Shadow DOM.
    const style = document.createElement('style');
    style.textContent = buttonCSS;
    this._root.appendChild(style);

    // Crea un div que servirá como punto de montaje para el componente React.
    this._mountPoint = document.createElement('div');
    this._root.appendChild(this._mountPoint);
    // Crea la raíz de React para renderizar el componente Button.
    this._reactRoot = ReactDOM.createRoot(this._mountPoint);
  }

  /**
   * `connectedCallback`.
   * Se invoca cuando el Custom Element es añadido al DOM.
   * En este punto, se realiza el primer renderizado del componente React,
   * asegurando que el botón se muestre correctamente al ser insertado en la página.
   * Las propiedades iniciales se obtienen de los atributos HTML (se maneja en `_render`).
   */
  connectedCallback() {
    this._render();
  }

  /**
   * `attributeChangedCallback`.
   * Se invoca cuando uno de los atributos definidos en `observedAttributes` cambia.
   * Actualiza la propiedad interna correspondiente y fuerza un re-renderizado
   * del componente React para reflejar el cambio en la UI.
   *
   * @param {string} name - El nombre del atributo que cambió.
   * @param {string|null} oldValue - El valor anterior del atributo.
   * @param {string|null} newValue - El nuevo valor del atributo.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // Actualiza la propiedad interna solo si el valor ha cambiado.
    // Esto es crucial para que _render reciba las props correctas.
    this._props[name] = newValue;
    this._render(); // Re-renderiza el componente React.
  }

  /**
   * Setter para la propiedad `onClick`.
   * Permite asignar una función de callback que se ejecutará cuando el botón sea clickeado.
   * Esta función se pasará al componente React `Button` como prop.
   *
   * @param {Function} fn - La función de callback a ejecutar en el clic.
   */
  set onClick(fn) {
    // Se espera que 'fn' sea una función. Se asigna directamente.
    this._props.onClick = fn;
    this._render(); // Re-renderiza para que el componente React reciba el nuevo onClick.
  }

  /**
   * `_render` (Método Interno).
   * Este método privado es responsable de renderizar el componente `Button` de React
   * dentro del Shadow DOM del Custom Element, pasándole todas las propiedades actuales.
   * Lee las propiedades (label, priority, state, onClick) del objeto `_props`.
   */
  _render() {
    // Destructura las propiedades necesarias del estado interno.
    const { label, priority, state, onClick } = this._props;

    this._reactRoot.render(
      <Button
        label={label}
        priority={priority}
        state={state}
        onClick={onClick}
      />
    );
  }
}

// Define el Custom Element 'x-button' en el navegador, asociándolo con la clase XButton.
customElements.define('x-button', XButton);
