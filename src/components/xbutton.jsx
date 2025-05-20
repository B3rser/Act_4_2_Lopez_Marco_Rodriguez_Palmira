import React from 'react';
import ReactDOM from 'react-dom/client';
import buttonCSS from './css/Button.css?inline'; // ⬅ Importar CSS como texto

const Button = ({ label, priority = 'primary', state = 'default', onClick }) => {
  const isDisabled = state === 'disabled';
  const className = `custom-button ${priority} ${state !== 'default' ? state : ''}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

class XButton extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'priority', 'state'];
  }

  constructor() {
    super();
    this._props = {};
    this._root = this.attachShadow({ mode: 'open' });

    // ⬇ Inyectar estilos al shadow root
    const style = document.createElement('style');
    style.textContent = buttonCSS;
    this._root.appendChild(style);

    this._mountPoint = document.createElement('div');
    this._root.appendChild(this._mountPoint);
    this._reactRoot = ReactDOM.createRoot(this._mountPoint);
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._props[name] = newValue;
    this._render();
  }

  set onClick(fn) {
    this._props.onClick = fn;
    this._render();
  }

  _render() {
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

customElements.define('x-button', XButton);
