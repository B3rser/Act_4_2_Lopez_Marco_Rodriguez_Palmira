import React from 'react';
import ReactDOM from 'react-dom/client';

import typographyCSS from './css/x-typography.css?inline';

export function Typography({ weight, size, font_family, component = "p", children, classname }) {
    const Component = component;

    return (
        <Component
            style={{
                fontWeight: weight,
                fontSize: size,
                fontFamily: font_family,
            }}
            className={classname}
        >
            {children}
        </Component>
    )
}

class XTypography extends HTMLElement {
    static get observedAttributes() {
        return ['weight', 'size', 'font-family', 'component', 'classname'];
    }

    constructor() {
        super();
        this._props = {};
        this._root = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = typographyCSS;
        this._root.appendChild(style);
        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);
        this._reactRoot = ReactDOM.createRoot(this._mountPoint);
        this._observer = new MutationObserver(this._onMutation.bind(this));
        this._observer.observe(this, { childList: true, subtree: true, characterData: true });

        console.log("XTypography constructor: _props inicial", this._props);
    }

    connectedCallback() {
        this._updatePropsFromAttributes();
        this._render();
    }

    disconnectedCallback() {
        this._reactRoot.unmount();
        this._observer.disconnect();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const propName = this._attributeNameToPropName(name);
        this._props[propName] = newValue;
        this._render(); // Forzamos un re-render con el atributo cambiado
    }

    _attributeNameToPropName(attributeName) {
        if (attributeName === 'font-family') {
            return 'font_family';
        }
        if (attributeName === 'classname') {
            return 'classname';
        }
        return attributeName;
    }

    _onMutation() {
        this._props.children = this.textContent;
        this._render();
    }

    _updatePropsFromAttributes() {
        XTypography.observedAttributes.forEach(attrName => {
            const value = this.getAttribute(attrName);
            if (value !== null) {
                const propName = this._attributeNameToPropName(attrName);
                this._props[propName] = value;
            }
        });
        this._props.children = this.textContent;
    }

    _render() {
        const { weight, size, font_family, component, classname, children } = this._props;
        console.log("XTypography _render: Props recibidas por render:", { weight, size, font_family, component, classname, children });

        this._reactRoot.render(
            <React.StrictMode>
                <Typography
                    weight={weight}
                    size={size}
                    font_family={font_family}
                    component={component}
                    classname={classname}
                >
                    {children}
                </Typography>
            </React.StrictMode>
        );
    }
}

customElements.define('x-typography', XTypography);