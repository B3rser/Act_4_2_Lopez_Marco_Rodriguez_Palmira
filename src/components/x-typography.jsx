import React from 'react';
import ReactDOM from 'react-dom/client';

import typographyCSS from './css/x-typography.css?inline';

/**
 * Description placeholder
 *
 * @export
 * @param {{ weight: any; size: any; font_family: any; component?: string; children: any; classname: any; }} param0 
 * @param {*} param0.weight 
 * @param {*} param0.size 
 * @param {*} param0.font_family 
 * @param {string} [param0.component="p"] 
 * @param {*} param0.children 
 * @param {*} param0.classname 
 * @returns {*} 
 */
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
    /**
     * Description placeholder
     *
     * @static
     * @readonly
     * @type {{}}
     */
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
    }

    /** Description placeholder */
    connectedCallback() {
        this._updatePropsFromAttributes();
        this._render();
    }

    /** Description placeholder */
    disconnectedCallback() {
        this._reactRoot.unmount();
        this._observer.disconnect();
    }

    /**
     * Description placeholder
     *
     * @param {*} name 
     * @param {*} oldValue 
     * @param {*} newValue 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        const propName = this._attributeNameToPropName(name);
        this._props[propName] = newValue;
        this._render();
    }

    /**
     * Description placeholder
     *
     * @param {*} attributeName 
     * @returns {*} 
     */
    _attributeNameToPropName(attributeName) {
        if (attributeName === 'font-family') {
            return 'font_family';
        }
        if (attributeName === 'classname') {
            return 'classname';
        }
        return attributeName;
    }

    /** Description placeholder */
    _onMutation() {
        this._props.children = this.textContent;
        this._render();
    }

    /** Description placeholder */
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

    /** Description placeholder */
    _render() {
        const { weight, size, font_family, component, classname, children } = this._props;
        this._reactRoot.render(
            <Typography
                weight={weight}
                size={size}
                font_family={font_family}
                component={component}
                classname={classname}
            >
                {children}
            </Typography>
        );
    }
}

customElements.define('x-typography', XTypography);