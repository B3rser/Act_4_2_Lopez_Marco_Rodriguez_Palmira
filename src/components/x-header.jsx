import React from 'react';
import ReactDOM from 'react-dom/client';
import headerCSS from './css/x-header.css?inline'; // Importa el CSS como una string

/**
 * @fileoverview Este módulo define el Web Component `x-header` y el componente React `Header`
 * que lo alimenta. `x-header` actúa como un envoltorio para integrar la funcionalidad de React
 * dentro de un Custom Element, permitiendo su uso en HTML estándar y proporcionando una interfaz
 * de propiedades y eventos nativa de Web Components.
 */

/**
 * `Header` (Componente React)
 *
 * Este componente funcional de React renderiza un encabezado de navegación fijo para la aplicación.
 * Incluye el logo de UniNavigator, enlaces de navegación a diferentes secciones de la aplicación
 * (Inicio, Universidades, Carreras, Becas, Asesoría) y una sección de usuario con un botón
 * para "Cerrar sesión". Utiliza otros Web Components como `x-typography` y `x-button` para sus elementos internos.
 *
 * @param {object} props - Las propiedades que recibe el componente. Actualmente no recibe props.
 * @returns {JSX.Element}
 */
const Header = ({ }) => {
    /**
     * `handleLogout`
     * Función de callback que se ejecuta cuando el botón "Cerrar sesión" es clickeado.
     * En una aplicación real, esta función manejaría la lógica de cierre de sesión del usuario.
     */
    const handleLogout = () => {
        console.log("Cerrar sesión clickeado!");
        // Aquí se implementaría la lógica real para cerrar la sesión del usuario.
    };

    return (
        <nav className="header">
            {/* Sección del logo y nombre de la aplicación */}
            <a href="/home" className="logo-section">
                <img src="./assets/Logo.png" alt="UniNavigator Logo" className="logo-image" />
                <x-typography component='h4' font-family='Montserrat'>UniNavigator</x-typography>
            </a>

            {/* Lista de enlaces de navegación */}
            <ul className="nav-links">
                <li><a href="/home"><x-typography component='p' font-family='Montserrat'>Inicio</x-typography></a></li>
                <li><a href="/expUni"><x-typography component='p' font-family='Montserrat'>Universidades</x-typography></a></li>
                <li><a href="/expCarr"><x-typography component='p' font-family='Montserrat'>Carreras</x-typography></a></li>
                <li><a href="/becas"><x-typography component='p' font-family='Montserrat'>Becas</x-typography></a></li>
                <li><a href="/asesorias"><x-typography component='p' font-family='Montserrat'>Asesoría</x-typography></a></li>
            </ul>

            {/* Sección de usuario con ícono y botón de cierre de sesión */}
            <div className="user-section">
                <x-icon name="user" color="var(--color-white)"></x-icon>
                <x-button label="Cerrar sesión" onClick={handleLogout} priority="secondary" state="default"></x-button>
            </div>
        </nav>
    );
};

// Web Component `XHeader`

/**
 * `XHeader`
 *
 * Esta clase extiende `HTMLElement` para crear un Custom Element (`<x-header>`).
 * Actúa como un puente entre el HTML estándar y el componente React `Header`.
 * Gestiona el montaje del componente React dentro de su Shadow DOM, permitiendo
 * la encapsulación de estilos y lógica del encabezado.
 *
 * @extends HTMLElement
 */
class XHeader extends HTMLElement {
    /**
     * Constructor de la clase `XHeader`.
     * Inicializa el estado interno (`_props`, aunque no se usa directamente en este componente),
     * adjunta el Shadow DOM, inyecta los estilos CSS y crea un punto de montaje para React.
     */
    constructor() {
        super();
        this._props = {}; // Objeto para almacenar propiedades del Custom Element (no utilizadas en este Header simple).
        this._root = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsulación.

        // Inyecta los estilos CSS del encabezado en el Shadow DOM.
        const style = document.createElement('style');
        style.textContent = headerCSS;
        this._root.appendChild(style);

        // Crea un div que servirá como punto de montaje para el componente React.
        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);
        // Crea la raíz de React para renderizar el componente Header.
        this._reactRoot = ReactDOM.createRoot(this._mountPoint);
    }

    /**
     * `connectedCallback`.
     * Se invoca cuando el Custom Element es añadido al DOM.
     * En este punto, se realiza el primer renderizado del componente React `Header`,
     * asegurando que el encabezado se muestre correctamente al ser insertado en la página.
     */
    connectedCallback() {
        this._render();
    }

    /**
     * `_render` (Método Interno).
     * Este método privado es responsable de renderizar el componente `Header` de React
     * dentro del Shadow DOM del Custom Element. Dado que el `Header` no recibe props
     * de este Custom Element, se renderiza sin ellas.
     */
    _render() {
        this._reactRoot.render(
            <Header />
        );
    }
}

// Define el Custom Element 'x-header' en el navegador, asociándolo con la clase XHeader.
customElements.define('x-header', XHeader);