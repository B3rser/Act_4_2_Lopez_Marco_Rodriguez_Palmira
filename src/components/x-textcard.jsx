import React from 'react';
import ReactDOM from 'react-dom/client';
import textCardCSS from './css/x-textCard.css?inline';

/**
 * Description placeholder
 *
 * @param {{ label: any; description: any; type?: string; buttonPriority?: string; buttonLabel?: string; icon: any; }} param0 
 * @param {*} param0.label 
 * @param {*} param0.description 
 * @param {string} [param0.type='default'] 
 * @param {string} [param0.buttonPriority='primary'] 
 * @param {string} [param0.buttonLabel='Ver más'] 
 * @param {*} param0.icon 
 * @returns {*} 
 */
const TextCard = ({
  label,
  description,
  type = 'default',
  buttonPriority = 'primary',
  buttonLabel = 'Ver más',
  icon,
}) => {
  return (
    <div className="text-card">
      <h3 className="text-card-title">
        {label}
        {icon && <x-icon name={icon} size="24" style={{ marginLeft: '8px', verticalAlign: 'middle' }} />}
      </h3>
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
  /**
   * Description placeholder
   *
   * @static
   * @readonly
   * @type {{}}
   */
  static get observedAttributes() {
    return ['label', 'description', 'type', 'buttonpriority', 'buttonlabel', 'icon'];
  }

  /**
   * Creates an instance of XTextCard.
   *
   * @constructor
   */
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

  /** Description placeholder */
  connectedCallback() {
    this._mountPoint.addEventListener('click', (e) => {
      if (e.target.tagName === 'X-BUTTON' && this._props.onClick) {
        this._props.onClick(e);
      }
    });

    this._render();
  }

  /**
   * Description placeholder
   *
   * @param {*} name 
   * @param {*} _ 
   * @param {*} newValue 
   */
  attributeChangedCallback(name, _, newValue) {
    this._props[name.toLowerCase()] = newValue;
    this._render();
  }

  /**
   * Description placeholder
   *
   * @type {*}
   */
  set onClick(fn) {
    this._props.onClick = fn;
    this._render();
  }

  /** Description placeholder */
  _render() {
    const {
      label,
      description,
      type,
      buttonpriority,
      buttonlabel,
      icon,
      onClick,
    } = this._props;

    this._reactRoot.render(
      <TextCard
        label={label}
        description={description}
        type={type}
        buttonPriority={buttonpriority}
        buttonLabel={buttonlabel}
        icon={icon}
        onClick={onClick}
      />
    );
  }
}

customElements.define('x-textcard', XTextCard);
