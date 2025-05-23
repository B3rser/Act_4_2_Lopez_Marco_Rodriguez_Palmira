import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import inputCSS from './css/x-input.css?inline';

const InputComponent = ({ label, placeholder, value, onChange }) => {
    const [inputValue, setInputValue] = useState(value || '');
    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="input-container">
            {label && <x-typography font-family="Roboto" component="p" className="input-label">{label}</x-typography>}
            <input
                type="text"
                className="input-field"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

class XInput extends HTMLElement {
    static get observedAttributes() {
        return ['label', 'placeholder', 'value'];
    }

    constructor() {
        super();
        this._props = {};
        this._root = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = inputCSS;
        this._root.appendChild(style);

        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);
        this._reactRoot = ReactDOM.createRoot(this._mountPoint);

        this.handleChange = this.handleChange.bind(this);
    }

    connectedCallback() {
        this._props.value = this.getAttribute('value') || '';
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this._props[name] !== newValue) {
            this._props[name] = newValue;
            this._render();
        }
    }

    set value(val) {

        if (this._props.value !== val) {
            this._props.value = val;
            this.setAttribute('value', val);
            this._render();
        }
    }

    get value() {
        return this._props.value || '';
    }

    set onChange(fn) {
        if (typeof fn === 'function') {
            this._props.onChange = fn;
        } else {
            console.warn("x-input: 'onChange' property must be a function.");
            delete this._props.onChange;
        }
        this._render();
    }

    handleChange(event) {
        const newValue = event.target.value;

        this._props.value = newValue;

        this.setAttribute('value', newValue);

        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: newValue },
            bubbles: true,
            composed: true
        }));

        if (typeof this._props.onChange === 'function') {
            this._props.onChange(event);
        }
        this._render();
    }

    _render() {
        const { label, placeholder, value } = this._props;

        this._reactRoot.render(
            <InputComponent
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange}
            />
        );
    }
}

customElements.define('x-input', XInput);