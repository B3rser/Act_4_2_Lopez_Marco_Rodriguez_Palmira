// x-textcard2.jsx
import ReactDOM from 'react-dom/client';
import textCard2CSS from './css/x-textCard2.css?inline';

/**
 * Description placeholder
 *
 * @param {{ icon: any; description: any; onClick: any; }} param0 
 * @param {*} param0.icon 
 * @param {*} param0.description 
 * @param {*} param0.onClick 
 * @returns {*} 
 */
const TextCard2 = ({ icon, description, onClick }) => {
  return (
    <div className="text-card2" onClick={onClick}>
      <div className="text-card2-icon">
        <x-icon name={icon} size="40" color="var(--color-navy-blue)"></x-icon>
      </div>
      <p className="text-card2-description">{description}</p>
      
    </div>
  );
};

class XTextCard2 extends HTMLElement {
  /**
   * Description placeholder
   *
   * @static
   * @readonly
   * @type {{}}
   */
  static get observedAttributes() {
    return ['icon', 'description'];
  }

  /**
   * Creates an instance of XTextCard2.
   *
   * @constructor
   */
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

  /** Description placeholder */
  connectedCallback() {
    this._mountPoint.addEventListener('click', (e) => {
      if (this._props.onClick) {
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
    const { icon, description, onClick } = this._props;

    this._reactRoot.render(
      <TextCard2 icon={icon} description={description} onClick={onClick} />
    );
  }
}

customElements.define('x-textcard2', XTextCard2);
