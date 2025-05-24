import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import inputCSS from './css/x-input.css?inline';

/**
 * @fileoverview Este módulo define el Web Component `x-input` y el componente React `InputComponent`
 * que lo alimenta. `x-input` actúa como un envoltorio para integrar la funcionalidad de React
 * dentro de un Custom Element, permitiendo su uso en HTML estándar y proporcionando una interfaz
 * de propiedades y eventos nativa de Web Components para campos de entrada de texto.
 */

/**
 * `InputComponent` (Componente React)
 *
 * Este componente funcional de React renderiza un campo de entrada de texto (`<input>`)
 * con una etiqueta opcional. Gestiona su propio estado interno para el valor de entrada,
 * pero también sincroniza con una prop `value` externa, permitiendo un control tanto
 * "controlado" como "no controlado" flexible.
 *
 * @param {object} props - Las propiedades que recibe el componente.
 * @param {string} [props.label] - El texto de la etiqueta que se mostrará encima del campo de entrada. Opcional.
 * @param {string} [props.placeholder] - El texto de marcador de posición que se muestra cuando el campo está vacío. Opcional.
 * @param {string} [props.value=''] - El valor inicial y controlado del campo de entrada.
 * @param {Function} [props.onChange] - Función de callback que se ejecuta cuando el valor del campo de entrada cambia.
 * @returns {JSX.Element}
 */
const InputComponent = ({ label, placeholder, value, onChange }) => {
    // `useState` para gestionar el valor interno del input. Se inicializa con la prop `value` o una cadena vacía.
    const [inputValue, setInputValue] = useState(value || '');

    // `useEffect` para sincronizar el estado interno `inputValue` con la prop `value` externa.
    // Esto asegura que si la prop `value` cambia desde el padre, el input refleje ese cambio.
    useEffect(() => {
        setInputValue(value || '');
    }, [value]); // Dependencia en `value`: el efecto se re-ejecuta si `value` cambia.

    /**
     * `handleChange`
     * Manejador de eventos para el cambio del input. Actualiza el estado interno
     * y, si se proporciona, llama a la función `onChange` pasada por las props.
     * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio del input.
     */
    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue); // Actualiza el estado interno del input.
        if (onChange) {
            onChange(e); // Llama al callback `onChange` si está definido.
        }
    };

    return (
        <div className="input-container">
            {/* Renderiza la etiqueta si la prop `label` está presente. */}
            {label && <x-typography font-family="Roboto" component="p" className="input-label">{label}</x-typography>}
            <input
                type="text" // Tipo de input de texto.
                className="input-field" // Clase CSS para estilizado.
                placeholder={placeholder} // Texto de marcador de posición.
                value={inputValue} // El valor actual del input, controlado por el estado de React.
                onChange={handleChange} // Manejador del evento de cambio.
            />
        </div>
    );
};

// Web Component `XInput`

/**
 * `XInput`
 *
 * Esta clase extiende `HTMLElement` para crear un Custom Element (`<x-input>`).
 * Actúa como un puente entre el HTML estándar y el componente React `InputComponent`.
 * Gestiona los atributos HTML (`label`, `placeholder`, `value`) y la propiedad `onChange`
 * del Custom Element, y los pasa como propiedades al componente React.
 *
 * @extends HTMLElement
 */
class XInput extends HTMLElement {
    /**
     * Propiedad estática `observedAttributes`.
     * Define qué atributos HTML el Custom Element observará para cambios.
     * Cuando uno de estos atributos cambia, se invoca `attributeChangedCallback`.
     * @static
     * @readonly
     * @type {string[]}
     */
    static get observedAttributes() {
        return ['label', 'placeholder', 'value'];
    }

    /**
     * Constructor de la clase `XInput`.
     * Inicializa el estado interno para las propiedades del Custom Element (`_props`),
     * adjunta el Shadow DOM, inyecta los estilos CSS y crea un punto de montaje para React.
     * También vincula el contexto de `handleChange` al de la instancia de la clase.
     */
    constructor() {
        super();
        this._props = {}; // Objeto para almacenar las propiedades del Custom Element.
        this._root = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsulación.

        // Inyecta los estilos CSS del input en el Shadow DOM.
        const style = document.createElement('style');
        style.textContent = inputCSS;
        this._root.appendChild(style);

        // Crea un div que servirá como punto de montaje para el componente React.
        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);
        // Crea la raíz de React para renderizar el componente InputComponent.
        this._reactRoot = ReactDOM.createRoot(this._mountPoint);

        // Vincula el método `handleChange` a la instancia de la clase para asegurar
        // que `this` se refiere correctamente a la instancia del Custom Element cuando se llama.
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * `connectedCallback`.
     * Se invoca cuando el Custom Element es añadido al DOM.
     * Inicializa la prop `value` interna a partir del atributo HTML si existe
     * y realiza el primer renderizado del componente React.
     */
    connectedCallback() {
        this._props.value = this.getAttribute('value') || '';
        this._render();
    }

    /**
     * `attributeChangedCallback`.
     * Se invoca cuando uno de los atributos definidos en `observedAttributes` cambia.
     * Actualiza la propiedad interna correspondiente solo si el valor ha cambiado,
     * y fuerza un re-renderizado del componente React para reflejar el cambio en la UI.
     *
     * @param {string} name - El nombre del atributo que cambió (ej. 'label', 'value').
     * @param {string|null} oldValue - El valor anterior del atributo.
     * @param {string|null} newValue - El nuevo valor del atributo.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        // Solo actualiza y re-renderiza si el nuevo valor es diferente al almacenado.
        if (this._props[name] !== newValue) {
            this._props[name] = newValue;
            this._render(); // Re-renderiza el componente React.
        }
    }

    /**
     * Setter para la propiedad `value` del Custom Element.
     * Permite establecer el valor del input programáticamente desde JavaScript.
     * Actualiza la propiedad interna, el atributo HTML `value` y re-renderiza el componente React.
     * @param {string} val - El nuevo valor a establecer en el input.
     */
    set value(val) {
        // Solo actualiza y re-renderiza si el nuevo valor es diferente al actual.
        if (this._props.value !== val) {
            this._props.value = val;
            this.setAttribute('value', val); // Sincroniza el atributo HTML `value`.
            this._render(); // Re-renderiza el componente React.
        }
    }

    /**
     * Getter para la propiedad `value` del Custom Element.
     * Permite obtener el valor actual del input programáticamente desde JavaScript.
     * @returns {string} El valor actual del input.
     */
    get value() {
        return this._props.value || '';
    }

    /**
     * Setter para la propiedad `onChange` del Custom Element.
     * Permite asignar una función de callback que se ejecutará cuando el valor del input cambie.
     * Esta función se pasará al componente React `InputComponent`.
     * @param {Function} fn - La función de callback a ejecutar en el cambio del input.
     */
    set onChange(fn) {
        if (typeof fn === 'function') {
            this._props.onChange = fn;
        } else {
            console.warn("x-input: 'onChange' property must be a function.");
            delete this._props.onChange; // Elimina la propiedad si no es una función válida.
        }
        this._render(); // Re-renderiza para que el componente React reciba el nuevo `onChange`.
    }

    /**
     * `handleChange` (Manejador interno de eventos).
     * Este método se invoca cuando el componente React `InputComponent` detecta un cambio en el input.
     * Actualiza el valor interno del Custom Element, sincroniza el atributo HTML `value`,
     * despacha un evento `change` personalizado y, si está definido, llama al `onChange` proporcionado.
     * @param {Event} event - El evento de cambio nativo del input.
     */
    handleChange(event) {
        const newValue = event.target.value;

        // Actualiza la propiedad interna del Custom Element.
        this._props.value = newValue;

        // Sincroniza el atributo HTML 'value' con el nuevo valor.
        this.setAttribute('value', newValue);

        // Despacha un evento 'change' personalizado para que el Custom Element sea reactivo a eventos externos.
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: newValue }, // Detalle del evento que incluye el nuevo valor.
            bubbles: true, // El evento burbujea por el DOM.
            composed: true // El evento puede atravesar los límites del Shadow DOM.
        }));

        // Si se proporcionó una función onChange al Custom Element, se llama.
        if (typeof this._props.onChange === 'function') {
            this._props.onChange(event);
        }
        this._render(); // Re-renderiza para que el componente React refleje el estado más reciente.
    }

    /**
     * `_render` (Método Interno).
     * Este método privado es responsable de renderizar el componente `InputComponent` de React
     * dentro del Shadow DOM del Custom Element, pasándole todas las propiedades actuales.
     * Lee las propiedades (label, placeholder, value) del objeto `_props` y pasa el `handleChange` interno.
     */
    _render() {
        const { label, placeholder, value } = this._props;

        this._reactRoot.render(
            <InputComponent
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange} // Pasa el manejador de cambio interno del Custom Element.
            />
        );
    }
}

// Define el Custom Element 'x-input' en el navegador, asociándolo con la clase XInput.
customElements.define('x-input', XInput);