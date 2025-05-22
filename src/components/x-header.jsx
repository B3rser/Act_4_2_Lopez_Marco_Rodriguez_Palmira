import React from 'react';
import ReactDOM from 'react-dom/client';
import headerCSS from './css/x-header.css?inline';

const Header = ({ }) => {
    const handleLogout = () => {
        console.log("Cerrar sesión clickeado!");
    };

    return (
        <nav className="header">
            <div className="logo-section">
                <img sizes='74px 74px' src="./assets/Logo.png" alt="UniNavigator Logo" className="logo-image" />
                <x-typography component='h4' font-family='Montserrat'>UniNavigator</x-typography>
            </div>

            <ul className="nav-links">
                <li><a href="#inicio"><x-typography component='p' font-family='Montserrat'>Inicio</x-typography></a></li>
                <li><a href="#explorar"><x-typography component='p' font-family='Montserrat'>Universidades</x-typography></a></li>
                <li><a href="#explorar"><x-typography component='p' font-family='Montserrat'>Carreras</x-typography></a></li>
                <li><a href="#becas"><x-typography component='p' font-family='Montserrat'>Becas</x-typography></a></li>
                <li><a href="#asesoria"><x-typography component='p' font-family='Montserrat'>Asesoría</x-typography></a></li>
            </ul>

            <div className="user-section">
                <x-icon name="user" color="var(--color-white)"></x-icon>
                <x-button label="Cerrar sesión" onClick={handleLogout} priority="secondary" state="default"></x-button>
            </div>
        </nav>
    );
};

class XHeader extends HTMLElement {
    constructor() {
        super();
        this._props = {};
        this._root = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = headerCSS;
        this._root.appendChild(style);

        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);
        this._reactRoot = ReactDOM.createRoot(this._mountPoint);
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        this._reactRoot.render(
            <Header />
        );
    }
}

customElements.define('x-header', XHeader);