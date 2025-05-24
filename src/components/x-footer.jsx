import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import footerCSS from './css/x-footer.css?inline';

/**
 * Description placeholder
 *
 * @returns {*} 
 */
const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        console.log('Correo electrónico para suscripción:', email);
        alert(`Suscrito con: ${email}`);
        setEmail('');
    };

    const handleLogout = () => {
        console.log("Cerrar sesión del footer clickeado!");
    };

    return (
        <footer className="footer">
            <div className="footer-top-section">
                <div className="footer-column">
                    <x-typography font-family="DM Sans" weight="700" component="p">Explorar</x-typography>
                    <ul>
                        <li><a href="#carreras"><x-typography font-family="DM Sans" component="p">Carreras</x-typography></a></li>
                        <li><a href="#universidades"><x-typography font-family="DM Sans" component="p">Universidades</x-typography></a></li>
                        <li><a href="#comparador"><x-typography font-family="DM Sans" component="p">Comparador</x-typography></a></li>
                        <li><a href="#ranking"><x-typography font-family="DM Sans" component="p">Ranking</x-typography></a></li>
                        <li><a href="#guias-educativas"><x-typography font-family="DM Sans" component="p">Guías educativas</x-typography></a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <x-typography font-family="DM Sans" weight="700" component="p">Recursos</x-typography>
                    <ul>
                        <li><a href="#test-vocacional"><x-typography font-family="DM Sans" component="p">Test vocacional</x-typography></a></li>
                        <li><a href="#consejos-estudio"><x-typography font-family="DM Sans" component="p">Consejos de estudio</x-typography></a></li>
                        <li><a href="#blog"><x-typography font-family="DM Sans" component="p">Blog</x-typography></a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <x-typography font-family="DM Sans" weight="700" component="p">Soporte</x-typography>
                    <ul>
                        <li><a href="#contacto"><x-typography font-family="DM Sans" component="p">Contacto</x-typography></a></li>
                        <li><a href="#reportar-problema"><x-typography font-family="DM Sans" component="p">Reportar un problema</x-typography></a></li>
                        <li><a href="#preguntas-frecuentes"><x-typography font-family="DM Sans" component="p">Preguntas frecuentes</x-typography></a></li>
                    </ul>
                </div>

                <div className="footer-column subscribe">
                    <x-typography font-family="DM Sans" weight="700" component="p">Recibe consejos</x-typography>
                    <form onSubmit={handleSubscribe}>
                        <x-input
                            label=""
                            placeholder="correo electrónico"
                            value={email}
                            onchange={(e) => handleEmailInputChange(e)}
                        ></x-input>
                    </form>
                    <x-typography font-family="DM Sans" component="p" className="subscribe-text">
                        Recibe recomendaciones personalizadas, actualizaciones sobre becas y eventos directamente en tu bandeja de entrada.
                    </x-typography>
                </div>
            </div>
            <hr className='divider'></hr>

            <div className="footer-bottom-section">
                <div style={{ backgroundColor: "var(--color-navy-blue)", borderRadius: "15px" }}>
                    <img src="./assets/Logo.png" alt="UniNavigator Logo" className="logo-image" />
                </div>
                <div className="legal-links">
                    <a href="#terminos"><x-typography font-family="Roboto" component="p">Términos</x-typography></a>
                    <a href="#privacidad"><x-typography font-family="Roboto" component="p">Privacidad</x-typography></a>
                    <a href="#cookies"><x-typography font-family="Roboto" component="p">Cookies</x-typography></a>
                </div>

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

class XFooter extends HTMLElement {
    /**
     * Creates an instance of XFooter.
     *
     * @constructor
     */
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = footerCSS;
        this._root.appendChild(style);

        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);

        this._reactRoot = ReactDOM.createRoot(this._mountPoint);
    }

    /** Description placeholder */
    connectedCallback() {
        this._render();
    }

    /** Description placeholder */
    disconnectedCallback() {
        this._reactRoot.unmount();
    }

    /** Description placeholder */
    _render() {
        this._reactRoot.render(
            <Footer />
        );
    }
}

customElements.define('x-footer', XFooter);