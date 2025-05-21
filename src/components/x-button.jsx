import React from 'react';
import ReactDOM from 'react-dom/client';
import buttonCSS from './css/x-button.css?inline';

const Button = ({ label, priority = 'primary', state = 'default', onClick }) => {
  const isDisabled = state === 'disabled';
  const isIconButton = priority === 'button-icon';
  const className = `custom-button ${priority} ${state !== 'default' ? state : ''}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={isDisabled}
    >
      <span>{label}</span>
      {isIconButton && <x-icon name="arrow-right" size="16" class="icon-right" color='var(--color-white)' />}
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
