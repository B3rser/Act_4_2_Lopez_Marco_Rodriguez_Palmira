// x-textcard2.jsx
import ReactDOM from 'react-dom/client';
import textCard2CSS from './css/x-textCard2.css?inline';

const TextCard2 = ({ icon, description, onClick }) => {
  return (
    <div className="text-card2" onClick={onClick}>
      <div className="text-card2-icon">
        <x-icon name={icon} size="40" color="var(--color-navy-blue)"></x-icon>
      </div>
      <h3 className="text-card2-description">{description}</h3>
      
    </div>
  );
};

class XTextCard2 extends HTMLElement {
  static get observedAttributes() {
    return ['icon', 'description'];
  }

  constructor() {
    super();
    this._props = {};
    this._root = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = textCard2CSS;

    this._mountPoint = document.createElement('div');
    this._root.appendChild(style);
    this._root.appendChild(this._mountPoint);

    this._reactRoot = ReactDOM.createRoot(this._mountPoint);
  }

  connectedCallback() {
    this._mountPoint.addEventListener('click', (e) => {
      if (this._props.onClick) {
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
    const { icon, description, onClick } = this._props;

    this._reactRoot.render(
      <TextCard2 icon={icon} description={description} onClick={onClick} />
    );
  }
}

customElements.define('x-textcard2', XTextCard2);
