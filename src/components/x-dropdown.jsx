import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import dropdownCSS from './css/x-dropdown.css?inline'; // Importa el CSS como una string

/**
 * @fileoverview Este módulo define el Web Component `x-dropdown` y el componente React `DropdownComponent`. 
 * `x-dropdown` actúa como un envoltorio para integrar la funcionalidad de React
 * dentro de un Custom Element, permitiendo su uso en HTML estándar y proporcionando una interfaz de
 * propiedades y eventos nativa de Web Components.
 */

/**
 * `DropdownComponent`
 *
 * Este componente funcional de React es el corazón del dropdown. Gestiona el estado interno
 * del desplegable (abierto/cerrado, valor seleccionado, elemento resaltado) y la lógica de
 * interacción del usuario (clics, navegación con teclado).
 *
 * @param {object} props - Las propiedades que recibe el componente.
 * @param {string} [props.placeholder='Dropdown'] - Texto que se muestra cuando no hay ninguna opción seleccionada.
 * @param {Array<object|string>} [props.options=[]] - Un array de opciones para el dropdown. Cada objeto de opción debe tener `{ value: string | number, label: string }`.
 * @param {string|number} props.value - El valor de la opción seleccionada.
 * @param {Function} props.onChange - Función de callback que se invoca cuando cambia el valor seleccionado.
 * @returns {JSX.Element}
 */
const DropdownComponent = ({
    placeholder = 'Dropdown',
    options = [],
    value,
    onChange
}) => {
    // Hooks de estado para gestionar la UI del dropdown
    const [isOpen, setIsOpen] = useState(false); // Controla si el menú desplegable está abierto
    const [selectedValue, setSelectedValue] = useState(value); // El valor de la opción actualmente seleccionada
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Índice del elemento resaltado
    const [isFocused, setIsFocused] = useState(false); // Estado para controlar el enfoque visual del dropdown

    // Referencia al elemento DOM del dropdown para manejar clics externos y eventos de teclado
    const dropdownRef = useRef(null);

    /**
     * `useEffect`: Sincroniza `selectedValue` con la prop `value`.
     * Se ejecuta cada vez que la prop `value` cambia, asegurando que el dropdown
     * refleje el valor controlado externamente.
     */
    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    /**
     * `useEffect`: Observa cambios en la prop `onChange` (principalmente para depuración).
     * Muestra en consola el valor de la prop `onChange` al renderizar o cuando esta cambia.
     * @remarks Este `useEffect` es principalmente para depuración y podría eliminarse en producción.
     */
    useEffect(() => {
        console.log('DropdownComponent: Prop onChange al renderizar:', onChange);
    }, [onChange]);

    /**
     * `useEffect`: Maneja los clics fuera del componente para cerrar el dropdown.
     * Añade y remueve un event listener global al documento para detectar clics fuera
     * del `dropdownRef`. Si se detecta un clic fuera, cierra el dropdown y reinicia
     * el índice de resaltado.
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        // Función de limpieza para remover el event listener cuando el componente se desmonta
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Se ejecuta solo una vez al montar y limpiar al desmontar.

    /**
     * `handleKeyDown`: Callback optimizado con `useCallback` para manejar la navegación
     * del teclado (flechas, Enter, Escape) cuando el dropdown está abierto.
     * Previene el comportamiento por defecto del navegador y actualiza el estado.
     *
     * @param {KeyboardEvent} e - El evento de teclado.
     */
    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return; // Solo actua si el dropdown está abierto

        // Normaliza las opciones para la navegación (extrae solo los valores si son objetos)
        const flatOptions = options.map(opt => typeof opt === 'object' ? opt.value : opt);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault(); // Evita el scroll de la página
                setHighlightedIndex(prev => (prev + 1) % flatOptions.length); // Mueve el resaltado hacia abajo (circular)
                break;
            case 'ArrowUp':
                e.preventDefault(); // Evita el scroll de la página
                setHighlightedIndex(prev => (prev - 1 + flatOptions.length) % flatOptions.length); // Mueve el resaltado hacia arriba (circular)
                break;
            case 'Enter':
                e.preventDefault(); // Evita el envío de formularios
                if (highlightedIndex !== -1) {
                    const selectedOption = options[highlightedIndex];
                    const val = typeof selectedOption === 'object' ? selectedOption.value : selectedOption;
                    const label = typeof selectedOption === 'object' ? selectedOption.label : selectedOption;
                    handleSelect(val, label); // Selecciona la opción resaltada
                }
                break;
            case 'Escape':
                e.preventDefault(); // Evita que se cierre el navegador
                setIsOpen(false); // Cierra el dropdown
                setHighlightedIndex(-1); // Reinicia el resaltado
                break;
            default:
                break;
        }
    }, [isOpen, options, highlightedIndex]);  // Se ejecuta cuando cambia alguno de estos

    /**
     * `useEffect`: Añade y remueve el event listener de teclado al `dropdownRef`.
     * Se activa cuando `isOpen` o `handleKeyDown` cambian. Esto asegura que el listener
     * solo esté activo cuando el dropdown puede recibir interacciones de teclado.
     */
    useEffect(() => {
        if (dropdownRef.current) { // Asegura que la referencia exista
            if (isOpen) {
                dropdownRef.current.addEventListener('keydown', handleKeyDown);
            } else {
                dropdownRef.current.removeEventListener('keydown', handleKeyDown);
            }
        }
        // Función de limpieza para remover el event listener cuando el componente se desmonta o el efecto se re-ejecuta
        return () => {
            if (dropdownRef.current) {
                dropdownRef.current.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [isOpen, handleKeyDown]); // Se ejecuta cuando cambia alguno de estos

    /**
     * `toggleDropdown`: Alterna el estado de abierto/cerrado del dropdown.
     * También reinicia el índice de resaltado al abrir o cerrar.
     */
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setHighlightedIndex(-1);
    };

    /**
     * `handleSelect`: Maneja la selección de una opción.
     * Actualiza el valor seleccionado, cierra el dropdown y llama a la función `onChange`
     * proporcionada por las props.
     *
     * @param {string|number} value - El valor de la opción seleccionada.
     * @param {string} label - La etiqueta visible de la opción seleccionada.
     */
    const handleSelect = (value, label) => {
        setSelectedValue(value);
        setIsOpen(false);
        console.log('DropdownComponent: Llamando a onChange con:', { value, label });
        if (onChange) {
            onChange({ target: { value: value, label: label } });
        }
    };

    /**
     * `getDisplayLabel`: Obtiene la etiqueta que se mostrará en el área seleccionada del dropdown.
     * Si hay un valor seleccionado, busca su etiqueta entre las opciones. Si no, usa el placeholder.
     *
     * @returns {string} La etiqueta a mostrar.
     */
    const getDisplayLabel = () => {
        if (selectedValue) {
            const selectedOption = options.find(opt =>
                (typeof opt === 'object' ? opt.value : opt) === selectedValue
            );
            return selectedOption ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption) : selectedValue;
        }
        return placeholder;
    };

    // Funciones para manejar el estado de enfoque 
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div
            className="dropdown-wrapper"
            ref={dropdownRef}
            tabIndex={0}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <div
                className={`dropdown-selected-area ${isFocused ? 'focus-visible' : ''}`}
                onClick={toggleDropdown}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby="dropdown-label"
            >
                {selectedValue ? (
                    <span className="dropdown-value">{getDisplayLabel()}</span>
                ) : (
                    <span className="dropdown-placeholder">{getDisplayLabel()}</span>
                )}
                {/* x-icon: Web Component para mostrar el icono de desplegable */}
                <x-icon name="dropdown" size="24" class="dropdown-icon"></x-icon>
            </div>

            {isOpen && (
                <ul
                    className="dropdown-options-container"
                    role="listbox"
                    aria-activedescendant={highlightedIndex !== -1 ? `option-${highlightedIndex}` : undefined}
                >
                    {options.map((option, index) => {
                        const optionValue = typeof option === 'object' ? option.value : option;
                        const optionLabel = typeof option === 'object' ? option.label : option;
                        return (
                            <li
                                key={optionValue}
                                id={`option-${index}`}
                                className={`dropdown-option ${index === highlightedIndex ? 'highlighted' : ''}`}
                                onClick={() => handleSelect(optionValue, optionLabel)}
                                role="option"
                                aria-selected={optionValue === selectedValue}
                            >
                                {optionLabel}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

// Web Component `XDropdown`

/**
 * `XDropdown`
 *
 * Esta clase extiende `HTMLElement` para crear un Custom Element (`<x-dropdown>`).
 * Actúa como un puente entre el HTML estándar y el componente React `DropdownComponent`.
 * Gestiona los atributos HTML y propiedades del Custom Element, y renderiza el componente React
 * dentro de su Shadow DOM. Despacha eventos `change` nativos al DOM cuando el valor interno cambia.
 *
 * @extends HTMLElement
 */
class XDropdown extends HTMLElement {
    /**
     * Propiedad estática `observedAttributes`.
     * Define qué atributos HTML el Custom Element observará para cambios.
     * Cuando uno de estos atributos cambia, se invoca `attributeChangedCallback`.
     * @static
     * @readonly
     * @type {string[]}
     */
    static get observedAttributes() {
        return ['placeholder', 'value'];
    }

    /**
     * Constructor de la clase `XDropdown`.
     * Inicializa el estado interno del Web Component, adjunta el Shadow DOM,
     * inyecta los estilos CSS, crea un punto de montaje para React y enlaza
     * el contexto de los métodos que se pasarán a React.
     */
    constructor() {
        super();
        this._props = { // Estado interno para las propiedades del Custom Element
            options: [],
            // 'placeholder' y 'value' se inicializarán en connectedCallback
        };
        // Adjunta un Shadow DOM al elemento para encapsular el contenido y estilos
        this._root = this.attachShadow({ mode: 'open' });

        // Inyecta los estilos CSS del dropdown en el Shadow DOM
        const style = document.createElement('style');
        style.textContent = dropdownCSS;
        this._root.appendChild(style);

        // Crea un div que servirá como punto de montaje para el componente React
        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);
        // Crea la raíz de React para renderizar el DropdownComponent
        this._reactRoot = ReactDOM.createRoot(this._mountPoint);

        // Enlaza el contexto de 'this' para el método handleChange
        // Esto es necesario para asegurar que 'this' se refiera a la instancia de XDropdown
        // cuando handleChange sea llamado por el DropdownComponent.
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * `connectedCallback`.
     * Se invoca cuando el Custom Element es añadido al DOM.
     * Aquí se inicializan las propiedades del componente a partir de los atributos HTML
     * y se realiza el primer renderizado del componente React.
     */
    connectedCallback() {
        this._props.placeholder = this.getAttribute('placeholder') || this._props.placeholder;
        this._props.value = this.getAttribute('value') || '';
        this._render();
    }

    /**
     * `attributeChangedCallback`.
     * Se invoca cuando uno de los atributos definidos en `observedAttributes` cambia.
     * Actualiza la propiedad interna correspondiente y fuerza un re-renderizado del componente React.
     *
     * @param {string} name - El nombre del atributo que cambió.
     * @param {string|null} oldValue - El valor anterior del atributo.
     * @param {string|null} newValue - El nuevo valor del atributo.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        // Solo actualiza y re-renderiza si el valor realmente cambió
        if (this._props[name] !== newValue) {
            this._props[name] = newValue;
            this._render();
        }
    }

    /**
     * Setter para la propiedad `options`.
     * Permite pasar un array de opciones al Custom Element programáticamente.
     * Valida que el valor sea un array antes de asignarlo y re-renderiza.
     *
     * @param {Array<object|string>} arr - El array de opciones.
     */
    set options(arr) {
        if (Array.isArray(arr)) {
            this._props.options = arr;
            this._render();
        } else {
            console.warn("x-dropdown: 'options' property must be an array.");
        }
    }

    /**
     * Getter para la propiedad `options`.
     * @type {Array<object|string>}
     */
    get options() {
        return this._props.options;
    }

    /**
     * Setter para la propiedad `value`.
     * Permite establecer el valor seleccionado del Custom Element programáticamente.
     * Actualiza el atributo HTML `value` y re-renderiza.
     *
     * @param {string|number} val - El valor a establecer.
     */
    set value(val) {
        if (this._props.value !== val) {
            this._props.value = val;
            this.setAttribute('value', val); // Sincroniza con el atributo HTML
            this._render();
        }
    }

    /**
     * Getter para la propiedad `value`.
     * @type {string|number}
     */
    get value() {
        return this._props.value || '';
    }

    /**
     * Setter para la propiedad `onChange`.
     * Permite asignar una función de callback que se ejecutará cuando el valor
     * del dropdown cambie, actuando como un listener de eventos.
     *
     * @param {Function} fn - La función de callback.
     */
    set onChange(fn) {
        if (typeof fn === 'function') {
            this._props.onChange = fn;
        } else {
            console.warn("x-dropdown: 'onChange' property must be a function.");
            delete this._props.onChange; // Elimina la prop si no es una función válida
        }
        this._render(); // Re-renderiza para que el componente React reciba el nuevo onChange
    }

    /**
     * `handleChange`.
     * Este método es el callback que el `DropdownComponent` de React invoca cuando
     * una opción es seleccionada. Se encarga de:
     * 1. Actualizar el estado interno del Web Component (`_props.value`).
     * 2. Sincronizar el atributo HTML `value`.
     * 3. Despachar un `CustomEvent` llamado 'change' al DOM nativo, permitiendo que
     * otros elementos escuchen cambios de la misma manera que un `<select>` nativo.
     * 4. Invocar la función `onChange` que haya sido asignada programáticamente al Custom Element.
     * 5. Re-renderizar el componente React.
     *
     * @param {object} event - Objeto de evento con `target: { value, label }` proveniente del componente React.
     */
    handleChange = (event) => {
        const newValue = event.target.value;
        const newLabel = event.target.label;

        this._props.value = newValue;
        this.setAttribute('value', newValue); // Actualiza el atributo HTML

        // Crea y despacha un evento 'change' nativo para que otros elementos puedan escucharlo
        const customEvent = new CustomEvent('change', {
            detail: { value: newValue, label: newLabel }, // Información detallada del cambio
            bubbles: true, // El evento puede propagarse por el DOM
            composed: true // El evento puede cruzar límites del Shadow DOM
        });

        console.log('XDropdown despachando CustomEvent:', customEvent);
        this.dispatchEvent(customEvent);

        // Si hay un callback onChange asignado programáticamente, lo invoca
        if (typeof this._props.onChange === 'function') {
            this._props.onChange(customEvent); // Pasa el CustomEvent al callback
        }
        this._render(); // Re-renderiza el componente React para reflejar el nuevo estado
    }

    /**
     * `_render` (Método Interno).
     * Este método privado es responsable de renderizar (o re-renderizar) el `DropdownComponent` de React
     * dentro del Shadow DOM del Custom Element, pasándole las propiedades actuales.
     */
    _render() {
        const { placeholder, options, value } = this._props; // Obtiene las props del estado interno

        this._reactRoot.render(
            <DropdownComponent
                placeholder={placeholder}
                options={options}
                value={value}
                onChange={this.handleChange} // Pasa el método handleChange del Custom Element al componente React
            />
        );
    }
}

// Define el Custom Element 'x-dropdown' en el navegador
customElements.define('x-dropdown', XDropdown);