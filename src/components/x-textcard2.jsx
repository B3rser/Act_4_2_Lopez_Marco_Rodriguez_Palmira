// x-textcard2.jsx
import ReactDOM from 'react-dom/client';
import textCard2CSS from './css/x-textCard2.css?inline';

/**
 * @fileoverview Este módulo define el Web Component `x-textcard2` y el componente React `TextCard2`
 * que lo alimenta. `x-textcard2` actúa como un envoltorio para integrar la funcionalidad de React
 * dentro de un Custom Element, permitiendo su uso en HTML estándar y proporcionando una interfaz
 * de propiedades y eventos nativa de Web Components para tarjetas de texto simples con ícono y capacidad de clic.
 */

/**
 * `TextCard2` (Componente React)
 *
 * Este componente funcional de React renderiza una tarjeta de texto compacta con un ícono y una descripción.
 * La tarjeta completa es clickeable, lo que la hace ideal para elementos de navegación o selección rápida.
 *
 * @param {object} props - Las propiedades que recibe el componente.
 * @param {string} props.icon - El nombre del ícono a mostrar en la tarjeta. Debe coincidir con un ícono disponible en `x-icon`.
 * @param {string} props.description - El texto descriptivo que se mostrará debajo del ícono.
 * @param {Function} [props.onClick] - Función de callback que se ejecuta cuando la tarjeta es clickeada.
 * @returns {JSX.Element}
 */
const TextCard2 = ({ icon, description, onClick }) => {
  return (
    <div className="text-card2" onClick={onClick}> {/* La tarjeta entera es clickeable */}
      <div className="text-card2-icon">
        {/* Renderiza el Web Component `x-icon` con el nombre, tamaño y color especificados */}
        <x-icon name={icon} size="40" color="var(--color-navy-blue)"></x-icon>
      </div>
      <p className="text-card2-description">{description}</p> {/* Descripción de la tarjeta */}
    </div>
  );
};

// Web Component `XTextCard2`

/**
 * `XTextCard2`
 *
 * Esta clase extiende `HTMLElement` para crear un Custom Element (`<x-textcard2>`).
 * Actúa como un puente entre el HTML estándar y el componente React `TextCard2`.
 * Gestiona los atributos HTML (`icon`, `description`) y la propiedad `onClick`
 * del Custom Element, y los pasa como propiedades al componente React.
 * Permite configurar el ícono, la descripción y el comportamiento de clic de la tarjeta
 * desde HTML o JavaScript nativo.
 *
 * @extends HTMLElement
 */
class XTextCard2 extends HTMLElement {
  /**
   * Propiedad estática `observedAttributes`.
   * Define qué atributos HTML el Custom Element observará para cambios.
   * Cuando uno de estos atributos cambia, se invoca `attributeChangedCallback`.
   * Los nombres de los atributos se convierten a minúsculas automáticamente para su uso interno.
   * @static
   * @readonly
   * @type {string[]}
   */
  static get observedAttributes() {
    return ['icon', 'description'];
  }

  /**
   * Constructor de la clase `XTextCard2`.
   * Inicializa el estado interno para las propiedades del Custom Element (`_props`),
   * adjunta el Shadow DOM, inyecta los estilos CSS y crea un punto de montaje para React.
   */
  constructor() {
    super();
    this._props = {}; // Objeto para almacenar las propiedades del Custom Element.
    this._root = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsulación.

    // Inyecta los estilos CSS de la tarjeta de texto 2 en el Shadow DOM.
    const style = document.createElement('style');
    style.textContent = textCard2CSS;
    this._root.appendChild(style); // Agrega los estilos al Shadow DOM.

    // Crea un div que servirá como punto de montaje para el componente React.
    this._mountPoint = document.createElement('div');
    this._root.appendChild(this._mountPoint); // Agrega el punto de montaje al Shadow DOM.

    // Crea la raíz de React para renderizar el componente TextCard2.
    this._reactRoot = ReactDOM.createRoot(this._mountPoint);
  }

  /**
   * `connectedCallback`.
   * Se invoca cuando el Custom Element es añadido al DOM.
   * En este punto, se adjunta un listener para el evento 'click' al punto de montaje del Shadow DOM.
   * Este listener captura los clics en la tarjeta y ejecuta la función `onClick` del Custom Element si está definida.
   * Finalmente, se realiza el primer renderizado del componente React.
   */
  connectedCallback() {
    // Agrega un listener de clic al punto de montaje del Shadow DOM.
    // Esto permite que el Custom Element reaccione a los clics en toda la tarjeta.
    this._mountPoint.addEventListener('click', (e) => {
      // Si hay una función `onClick` definida en el Custom Element, se ejecuta.
      if (this._props.onClick) {
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
   * @param {string} name - El nombre del atributo que cambió (ej. 'icon', 'description').
   * @param {string|null} _ - El valor anterior del atributo. No se usa directamente aquí.
   * @param {string|null} newValue - El nuevo valor del atributo.
   */
  attributeChangedCallback(name, _, newValue) {
    // Convierte el nombre del atributo a minúsculas para que coincida con las propiedades de React.
    this._props[name.toLowerCase()] = newValue;
    this._render(); // Re-renderiza el componente React.
  }

  /**
   * Setter para la propiedad `onClick`.
   * Permite asignar una función de callback que se ejecutará cuando la tarjeta sea clickeada.
   * Esta función se pasará al componente React `TextCard2` como prop `onClick`.
   *
   * @param {Function} fn - La función de callback a ejecutar en el clic de la tarjeta.
   */
  set onClick(fn) {
    // Se espera que 'fn' sea una función. Se asigna directamente.
    this._props.onClick = fn;
    this._render(); // Re-renderiza para que el componente React reciba el nuevo `onClick`.
  }

  /**
   * `_render` (Método Interno).
   * Este método privado es responsable de renderizar el componente `TextCard2` de React
   * dentro del Shadow DOM del Custom Element, pasándole todas las propiedades actuales.
   * Lee las propiedades (icon, description, onClick) del objeto `_props`.
   */
  _render() {
    // Destructura las propiedades necesarias del estado interno.
    const { icon, description, onClick } = this._props;

    this._reactRoot.render(
      <TextCard2
        icon={icon}
        description={description}
        onClick={onClick} // La función `onClick` del Custom Element se pasa directamente al componente React.
      />
    );
  }
}

// Define el Custom Element 'x-textcard2' en el navegador, asociándolo con la clase XTextCard2.
customElements.define('x-textcard2', XTextCard2);
