import React from 'react';
import ReactDOM from 'react-dom/client';

import typographyCSS from './css/x-typography.css?inline';

/**
 * @fileoverview Este módulo define el Web Component `x-typography` y el componente React `Typography`
 * que lo alimenta. `x-typography` actúa como un envoltorio para integrar la funcionalidad de React
 * dentro de un Custom Element, permitiendo su uso en HTML estándar y proporcionando una interfaz
 * de propiedades para controlar la tipografía (peso, tamaño, familia de fuente) de cualquier contenido textual.
 */

/**
 * `Typography` (Componente React)
 *
 * Este componente funcional de React renderiza un elemento HTML de texto (por defecto un párrafo `<p>`)
 * y le aplica estilos de tipografía dinámicamente utilizando propiedades. Permite controlar
 * el peso de la fuente (`weight`), el tamaño de la fuente (`size`), la familia de la fuente (`fontFamily`),
 * el tipo de elemento HTML (`component`) y clases CSS adicionales (`classname`).
 *
 * @param {object} props - Las propiedades que recibe el componente.
 * @param {string|number} props.weight - El peso de la fuente.
 * @param {string|number} props.size - El tamaño de la fuente.
 * @param {string} props.font_family - La familia de la fuente.
 * @param {string} [props.component="p"] - El nombre de la etiqueta HTML a renderizar.
 * @param {React.ReactNode} props.children - El contenido textual o los elementos hijos que se mostrarán dentro del componente.
 * @param {string} [props.classname] - Clases CSS adicionales para aplicar al elemento renderizado.
 * @returns {JSX.Element}
 */
export function Typography({ weight, size, font_family, component = "p", children, classname }) {
    // Determina el componente HTML a renderizar dinámicamente.
    const Component = component;

    return (
        <Component
            style={{
                fontWeight: weight,      // Aplica el peso de la fuente.
                fontSize: size,          // Aplica el tamaño de la fuente.
                fontFamily: font_family, // Aplica la familia de la fuente.
            }}
            className={classname} // Aplica clases CSS adicionales.
        >
            {children} {/* Renderiza el contenido hijo dentro del componente. */}
        </Component>
    )
}

// Web Component `XTypography`

/**
 * `XTypography`
 *
 * Esta clase extiende `HTMLElement` para crear un Custom Element (`<x-typography>`).
 * Actúa como un puente entre el HTML estándar y el componente React `Typography`.
 * Gestiona los atributos HTML (`weight`, `size`, `font-family`, `component`, `classname`)
 * y el contenido textual (`textContent`) del Custom Element, pasándolos como propiedades al componente React.
 * Utiliza un `MutationObserver` para detectar cambios en el contenido textual de forma reactiva.
 *
 * @extends HTMLElement
 */
class XTypography extends HTMLElement {
    /**
     * Propiedad estática `observedAttributes`.
     * Define qué atributos HTML el Custom Element observará para cambios.
     * Cuando uno de estos atributos cambia, se invoca `attributeChangedCallback`.
     * @static
     * @readonly
     * @type {string[]}
     */
    static get observedAttributes() {
        return ['weight', 'size', 'font-family', 'component', 'classname'];
    }

    /**
     * Constructor de la clase `XTypography`.
     * Inicializa el estado interno para las propiedades del Custom Element (`_props`),
     * adjunta el Shadow DOM, inyecta los estilos CSS y crea un punto de montaje para React.
     * También configura un `MutationObserver` para detectar cambios en el contenido hijo.
     */
    constructor() {
        super();
        this._props = {}; // Objeto para almacenar las propiedades del Custom Element.
        this._root = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsulación.

        // Inyecta los estilos CSS de la tipografía en el Shadow DOM.
        const style = document.createElement('style');
        style.textContent = typographyCSS;
        this._root.appendChild(style);

        // Crea un div que servirá como punto de montaje para el componente React.
        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);
        // Crea la raíz de React para renderizar el componente Typography.
        this._reactRoot = ReactDOM.createRoot(this._mountPoint);

        // Configura un MutationObserver para observar cambios en los nodos hijos
        // (texto, elementos) del Custom Element y re-renderizar React.
        this._observer = new MutationObserver(this._onMutation.bind(this));
        this._observer.observe(this, { childList: true, subtree: true, characterData: true });
    }

    /**
     * `connectedCallback`.
     * Se invoca cuando el Custom Element es añadido al DOM.
     * Actualiza las propiedades internas a partir de los atributos HTML y el `textContent`,
     * y realiza el primer renderizado del componente React.
     */
    connectedCallback() {
        this._updatePropsFromAttributes(); // Carga las props iniciales desde los atributos.
        this._render(); // Realiza el renderizado inicial del componente React.
    }

    /**
     * `disconnectedCallback`.
     * Se invoca cuando el Custom Element es eliminado del DOM.
     * Desmonta el componente React para liberar recursos y desconecta el `MutationObserver`.
     */
    disconnectedCallback() {
        this._reactRoot.unmount(); // Desmonta el árbol de React.
        this._observer.disconnect(); // Desconecta el observador para evitar fugas de memoria.
    }

    /**
     * `attributeChangedCallback`.
     * Se invoca cuando uno de los atributos definidos en `observedAttributes` cambia.
     * Actualiza la propiedad interna correspondiente (mapeando nombres de atributo a nombres de prop)
     * y fuerza un re-renderizado del componente React para reflejar el cambio en la UI.
     *
     * @param {string} name - El nombre del atributo que cambió (ej. 'weight', 'font-family').
     * @param {string|null} oldValue - El valor anterior del atributo.
     * @param {string|null} newValue - El nuevo valor del atributo.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        const propName = this._attributeNameToPropName(name); // Convierte el nombre del atributo a nombre de prop.
        this._props[propName] = newValue;
        this._render(); // Re-renderiza el componente React.
    }

    /**
     * `_attributeNameToPropName` (Método Interno).
     * Un método auxiliar para mapear los nombres de los atributos HTML (kebab-case)
     * a los nombres de las propiedades de React (camelCase o específicos).
     * @param {string} attributeName - El nombre del atributo HTML.
     * @returns {string} El nombre de la propiedad correspondiente en React.
     */
    _attributeNameToPropName(attributeName) {
        if (attributeName === 'font-family') {
            return 'font_family'; // Mapeo específico para 'font-family'.
        }
        // Para otros atributos, asume que el nombre ya es compatible o lo deja como está.
        // Si hubiera más atributos kebab-case, se añadiría lógica de camelCase aquí.
        return attributeName;
    }

    /**
     * `_onMutation` (Método Interno).
     * Callback para el `MutationObserver`. Se invoca cuando cambia el contenido textual
     * del Custom Element. Actualiza la propiedad `children` y re-renderiza el componente React.
     * @param {MutationRecord[]} mutations - Una lista de objetos `MutationRecord` que describen los cambios.
     * @param {MutationObserver} observer - La instancia del `MutationObserver` que invocó el callback.
     */
    _onMutation(mutations, observer) {
        // Actualiza `children` con el `textContent` actual del Custom Element.
        this._props.children = this.textContent;
        this._render(); // Re-renderiza para reflejar el nuevo contenido.
    }

    /**
     * `_updatePropsFromAttributes` (Método Interno).
     * Este método privado se encarga de leer todos los atributos observados del Custom Element
     * y almacenarlos en el objeto `_props` interno. También captura el `textContent` inicial.
     */
    _updatePropsFromAttributes() {
        XTypography.observedAttributes.forEach(attrName => {
            const value = this.getAttribute(attrName);
            if (value !== null) {
                const propName = this._attributeNameToPropName(attrName);
                this._props[propName] = value;
            }
        });
        // Captura el contenido textual inicial del Custom Element.
        this._props.children = this.textContent;
    }

    /**
     * `_render` (Método Interno).
     * Este método es responsable de renderizar el componente `Typography` de React
     * dentro del Shadow DOM del Custom Element, pasándole todas las propiedades actuales.
     * Lee las propiedades (weight, size, font_family, component, classname, children) del objeto `_props`.
     */
    _render() {
        const { weight, size, font_family, component, classname, children } = this._props;
        this._reactRoot.render(
            <Typography
                weight={weight}
                size={size}
                font_family={font_family}
                component={component}
                classname={classname}
            >
                {children}
            </Typography>
        );
    }
}

// Define el Custom Element 'x-typography' en el navegador, asociándolo con la clase XTypography.
customElements.define('x-typography', XTypography);