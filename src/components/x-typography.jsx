class XTypography extends HTMLElement {
    static get observedAttributes() {
        return ['weight', 'size', 'font-family', 'component', 'classname'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const weight = this.getAttribute('weight') || 'normal';
        const size = this.getAttribute('size') || '16px';
        const fontFamily = this.getAttribute('font-family') || 'Montserrat';
        const component = this.getAttribute('component') || 'p';
        const className = this.getAttribute('classname') || '';

        this.shadowRoot.innerHTML = '';

        const et = document.createElement(component);
        et.textContent = this.textContent;
        et.setAttribute('class', className);
        et.style.fontWeight = weight;
        et.style.fontSize = size;
        et.style.fontFamily = fontFamily;

        this.shadowRoot.appendChild(et);
    }
}

customElements.define('x-typography', XTypography);