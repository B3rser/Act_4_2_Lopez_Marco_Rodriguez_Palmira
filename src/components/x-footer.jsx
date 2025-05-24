import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import footerCSS from './css/x-footer.css?inline'; // Importa el CSS como una cadena en línea

/**
 * @fileoverview Este módulo define el Web Component `x-footer` y el componente React `Footer`
 * que lo alimenta. `x-footer` encapsula un pie de página completo que incluye secciones de navegación,
 * un formulario de suscripción y enlaces a redes sociales y legales.
 * Permite integrar esta sección de la UI de forma modular en cualquier página HTML estándar.
 */

/**
 * `Footer` (Componente React)
 *
 * Este componente funcional de React renderiza el pie de página de la aplicación.
 * Contiene múltiples columnas con enlaces de navegación (Explorar, Recursos, Soporte),
 * un formulario de suscripción y una sección inferior con el logo, enlaces legales y 
 * a redes sociales.
 *
 * @returns {JSX.Element}
 */
const Footer = () => {
    // `email`: Estado para almacenar el valor del campo de correo electrónico del formulario de suscripción.
    const [email, setEmail] = useState('');

    /**
     * `handleSubscribe`: Maneja el envío del formulario de suscripción.
     * Previene el comportamiento por defecto del formulario, imprime el correo electrónico
     * en la consola, muestra una alerta al usuario y limpia el campo de email.
     * @param {Event} e - El evento de envío del formulario.
     */
    const handleSubscribe = (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario.
        console.log('Correo electrónico para suscripción:', email);
        alert(`Suscrito con: ${email}`); // Muestra una confirmación al usuario.
        setEmail(''); // Limpia el campo de entrada después de la suscripción.
    };

    /**
     * `handleEmailInputChange`: Maneja el cambio de valor en el campo de entrada de correo electrónico.
     * Actualiza el estado `email` con el valor actual del input.
     * @param {Event} e - El evento de cambio del input.
     */
    const handleEmailInputChange = (e) => {
        setEmail(e.target.value);
    };

    /**
     * `handleLogout`: Función de ejemplo para un botón de cerrar sesión.
     * Simplemente imprime un mensaje en la consola.
     * @remarks Esta función es un placeholder y actualmente no está conectada a ningún elemento visible en el JSX.
     */
    const handleLogout = () => {
        console.log("Cerrar sesión del footer clickeado!");
    };

    return (
        <footer className="footer">
            {/* `footer-top-section`: Sección superior del pie de página con columnas de navegación y suscripción. */}
            <div className="footer-top-section">
                {/* `footer-column`: Columna "Explorar" con enlaces de navegación. */}
                <div className="footer-column">
                    {/* `x-typography`: Web Component para renderizar texto con estilos específicos. */}
                    <x-typography font-family="DM Sans" weight="700" component="p">Explorar</x-typography>
                    <ul>
                        <li><a href="#carreras"><x-typography font-family="DM Sans" component="p">Carreras</x-typography></a></li>
                        <li><a href="#universidades"><x-typography font-family="DM Sans" component="p">Universidades</x-typography></a></li>
                        <li><a href="#comparador"><x-typography font-family="DM Sans" component="p">Comparador</x-typography></a></li>
                        <li><a href="#ranking"><x-typography font-family="DM Sans" component="p">Ranking</x-typography></a></li>
                        <li><a href="#guias-educativas"><x-typography font-family="DM Sans" component="p">Guías educativas</x-typography></a></li>
                    </ul>
                </div>

                {/* `footer-column`: Columna "Recursos" con enlaces. */}
                <div className="footer-column">
                    <x-typography font-family="DM Sans" weight="700" component="p">Recursos</x-typography>
                    <ul>
                        <li><a href="#test-vocacional"><x-typography font-family="DM Sans" component="p">Test vocacional</x-typography></a></li>
                        <li><a href="#consejos-estudio"><x-typography font-family="DM Sans" component="p">Consejos de estudio</x-typography></a></li>
                        <li><a href="#blog"><x-typography font-family="DM Sans" component="p">Blog</x-typography></a></li>
                    </ul>
                </div>

                {/* `footer-column`: Columna "Soporte" con enlaces. */}
                <div className="footer-column">
                    <x-typography font-family="DM Sans" weight="700" component="p">Soporte</x-typography>
                    <ul>
                        <li><a href="#contacto"><x-typography font-family="DM Sans" component="p">Contacto</x-typography></a></li>
                        <li><a href="#reportar-problema"><x-typography font-family="DM Sans" component="p">Reportar un problema</x-typography></a></li>
                        <li><a href="#preguntas-frecuentes"><x-typography font-family="DM Sans" component="p">Preguntas frecuentes</x-typography></a></li>
                    </ul>
                </div>

                {/* `footer-column subscribe`: Columna para la suscripción. */}
                <div className="footer-column subscribe">
                    <x-typography font-family="DM Sans" weight="700" component="p">Recibe consejos</x-typography>
                    <form onSubmit={handleSubscribe}>
                        {/* `x-input`: Web Component para el campo de entrada de texto del correo electrónico. */}
                        <x-input
                            label="" // Etiqueta vacía, ya que el placeholder es suficiente aquí.
                            placeholder="correo electrónico"
                            value={email}
                            onchange={(e) => handleEmailInputChange(e)} // Propiedad para manejar cambios en el input.
                        ></x-input>
                    </form>
                    <x-typography font-family="DM Sans" component="p" className="subscribe-text">
                        Recibe recomendaciones personalizadas, actualizaciones sobre becas y eventos directamente en tu bandeja de entrada.
                    </x-typography>
                </div>
            </div>
            <hr className='divider'></hr> {/* `divider`: Línea divisoria entre las secciones superior e inferior del pie de página. */}

            {/* `footer-bottom-section`: Sección inferior del pie de página con logo, enlaces legales y redes sociales. */}
            <div className="footer-bottom-section">
                {/* Contenedor del logo con estilos en línea. */}
                <div style={{ backgroundColor: "var(--color-navy-blue)", borderRadius: "15px" }}>
                    <img src="./assets/Logo.png" alt="UniNavigator Logo" className="logo-image" />
                </div>
                {/* `legal-links`: Contenedor para enlaces legales (Términos, Privacidad, Cookies). */}
                <div className="legal-links">
                    <a href="#terminos"><x-typography font-family="Roboto" component="p">Términos</x-typography></a>
                    <a href="#privacidad"><x-typography font-family="Roboto" component="p">Privacidad</x-typography></a>
                    <a href="#cookies"><x-typography font-family="Roboto" component="p">Cookies</x-typography></a>
                </div>

                {/* `social-media-links`: Contenedor para enlaces a redes sociales usando. */}
                <div className="social-media-links">
                    <a href="#x"><x-icon name="x" size="16"></x-icon></a>
                    <a href="#instagram" ><x-icon name="instagram" size="16"></x-icon></a>
                    <a href="#tiktok" ><x-icon name="tiktok" size="16"></x-icon></a>
                    <a href="#facebook" ><x-icon name="facebook" size="16"></x-icon></a>
                </div>
            </div>
        </footer>
    );
};

/** 
 * Web Component `XFooter`
 */
class XFooter extends HTMLElement {
    /**
     * Constructor de la clase `XFooter`.
     * Inicializa el Custom Element, adjunta el Shadow DOM para encapsulación,
     * inyecta los estilos CSS y establece el punto de montaje para el componente React `Footer`.
     */
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsulación.

        // Inyecta los estilos CSS del footer en el Shadow DOM.
        const style = document.createElement('style');
        style.textContent = footerCSS;
        this._root.appendChild(style);

        // Crea un `div` que servirá como punto de montaje para el componente React.
        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);

        // Crea la raíz de React para renderizar el componente `Footer`.
        this._reactRoot = ReactDOM.createRoot(this._mountPoint);
    }

    /**
     * `connectedCallback`.
     * Se invoca cuando el Custom Element es añadido al DOM.
     * En este punto, se realiza el primer renderizado del componente React `Footer`.
     */
    connectedCallback() {
        this._render();
    }

    /**
     * `disconnectedCallback`.
     * Se invoca cuando el Custom Element es removido del DOM.
     * Es crucial llamar a `_reactRoot.unmount()` aquí para limpiar el árbol de React
     * y liberar recursos, previniendo fugas de memoria.
     */
    disconnectedCallback() {
        this._reactRoot.unmount();
    }

    /**
     * `_render`.
     * Este método privado es responsable de renderizar (o re-renderizar) el componente `Footer` de React
     * dentro del Shadow DOM del Custom Element.
     */
    _render() {
        this._reactRoot.render(
            <Footer /> // Renderiza el componente React `Footer` sin pasar props, ya que es un componente estático.
        );
    }
}

// Define el Custom Element 'x-footer' en el navegador, asociándolo con la clase `XFooter`.
customElements.define('x-footer', XFooter);