import React from 'react';
import ReactDOM from 'react-dom/client';
import textCardCSS from './css/TextCard.css?inline'; // Asegúrate de tener este archivo

const TextCard = ({
  label,
  description,
  type = 'default',
  buttonPriority = 'primary',
  buttonLabel = 'Ver más',
}) => {
  return (
    <div className="text-card">
      <h3 className="text-card-title">{label}</h3>
      <p className="text-card-description">{description}</p>
      {type === 'card-boton' && (
        <div className="text-card-button-wrapper">
          <x-button
            priority={buttonPriority}
            state="default"
            label={buttonLabel}
          />
        </div>
      )}
    </div>
  );
};

class XTextCard extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'description', 'type', 'buttonpriority', 'buttonlabel'];
  }

  constructor() {
    super();
    this._props = {};
    this._root = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = textCardCSS;

    this._mountPoint = document.createElement('div');
    this._root.appendChild(style);
    this._root.appendChild(this._mountPoint);

    this._reactRoot = ReactDOM.createRoot(this._mountPoint);
  }

  connectedCallback() {
    this._mountPoint.addEventListener('click', (e) => {
      if (e.target.tagName === 'X-BUTTON' && this._props.onClick) {
        this._props.onClick(e);
      }
    });

    this._render();
  }

  attributeChangedCallback(name, _, newValue) {
    this._props[name.toLowerCase()] = newValue;
    this._render();
  }

  set onClick(fn) {
    this._props.onClick = fn;
    this._render();
  }

  _render() {
    const {
      label,
      description,
      type,
      buttonpriority,
      buttonlabel,
      onClick, // Esto es importante para mantener la lógica
    } = this._props;

    this._reactRoot.render(
      <TextCard
        label={label}
        description={description}
        type={type}
        buttonPriority={buttonpriority}
        buttonLabel={buttonlabel}
        onClick={onClick}
      />
    );
  }
}

customElements.define('x-textcard', XTextCard);
