import ReactDOM from 'react-dom/client';
import cardCSS from './css/x-card.css?inline';
import React, { useEffect, useRef } from 'react';

const Card = ({
  type = 'universidad',
  image,
  title,
  content,
  buttonPriority = 'alternative-card',
  buttonLabel = 'Ver más',
  onButtonClick,
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current && onButtonClick) {
      buttonRef.current.onClick = onButtonClick;
    }
  }, [onButtonClick]);

  const cardClass = `card ${type}`;

  return (
    <div className={cardClass}>
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{content}</p>
        <div className="card-button">
          <x-button
            ref={buttonRef}
            priority={buttonPriority}
            state="default"
            label={buttonLabel}
          />
        </div>
      </div>
    </div>
  );
};

class XCard extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'image', 'title', 'content', 'buttonpriority', 'buttonlabel'];
  }

  constructor() {
    super();
    this._props = {};
    this._root = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = cardCSS;
    this._mountPoint = document.createElement('div');

    this._root.appendChild(style);
    this._root.appendChild(this._mountPoint);

    this._reactRoot = ReactDOM.createRoot(this._mountPoint);
  }

  connectedCallback() {
    // Agrega listener al botón si se definió onClick
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
      type,
      image,
      title,
      content,
      buttonpriority,
      buttonlabel,
      onClick,
    } = this._props;

    this._reactRoot.render(
      <Card
        type={type}
        image={image}
        title={title}
        content={content}
        buttonPriority={buttonpriority}
        buttonLabel={buttonlabel}
        onButtonClick={onClick}
      />
    );
  }

}

customElements.define('x-card', XCard);
