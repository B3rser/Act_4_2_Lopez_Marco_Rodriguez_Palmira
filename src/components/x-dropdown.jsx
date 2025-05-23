import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import dropdownCSS from './css/x-dropdown.css?inline';

const DropdownComponent = ({
    placeholder = 'Dropdown',
    options = [],
    value,
    onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    useEffect(() => {
        console.log('DropdownComponent: Prop onChange al renderizar:', onChange);
    }, [onChange]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;

        const flatOptions = options.map(opt => typeof opt === 'object' ? opt.value : opt);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => (prev + 1) % flatOptions.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => (prev - 1 + flatOptions.length) % flatOptions.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex !== -1) {
                    const selectedOption = options[highlightedIndex];
                    const val = typeof selectedOption === 'object' ? selectedOption.value : selectedOption;
                    const label = typeof selectedOption === 'object' ? selectedOption.label : selectedOption;
                    handleSelect(val, label);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
            default:
                break;
        }
    }, [isOpen, options, highlightedIndex]);

    useEffect(() => {
        if (isOpen) {
            dropdownRef.current.addEventListener('keydown', handleKeyDown);
        } else {
            dropdownRef.current.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            if (dropdownRef.current) {
                dropdownRef.current.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [isOpen, handleKeyDown]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setHighlightedIndex(-1);
    };

    const handleSelect = (value, label) => {
        setSelectedValue(value);
        setIsOpen(false);
        console.log('DropdownComponent: Llamando a onChange con:', { value, label });
        if (onChange) {
            onChange({ target: { value: value, label: label } });
        }
    };

    const getDisplayLabel = () => {
        if (selectedValue) {
            const selectedOption = options.find(opt =>
                (typeof opt === 'object' ? opt.value : opt) === selectedValue
            );
            return selectedOption ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption) : selectedValue;
        }
        return placeholder;
    };

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div
            className="dropdown-wrapper"
            ref={dropdownRef}
            tabIndex={0}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <div
                className={`dropdown-selected-area ${isFocused ? 'focus-visible' : ''}`}
                onClick={toggleDropdown}
            >
                {selectedValue ? (
                    <span className="dropdown-value">{getDisplayLabel()}</span>
                ) : (
                    <span className="dropdown-placeholder">{getDisplayLabel()}</span>
                )}
                <x-icon name="dropdown" size="24" class="dropdown-icon"></x-icon>
            </div>

            {isOpen && (
                <ul className="dropdown-options-container">
                    {options.map((option, index) => {
                        const optionValue = typeof option === 'object' ? option.value : option;
                        const optionLabel = typeof option === 'object' ? option.label : option;
                        return (
                            <li
                                key={optionValue}
                                className={`dropdown-option ${index === highlightedIndex ? 'highlighted' : ''}`}
                                onClick={() => handleSelect(optionValue, optionLabel)}
                            >
                                {optionLabel}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

class XDropdown extends HTMLElement {
    static get observedAttributes() {
        return ['placeholder', 'value'];
    }

    constructor() {
        super();
        this._props = {
            options: [],
        };
        this._root = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = dropdownCSS;
        this._root.appendChild(style);

        this._mountPoint = document.createElement('div');
        this._root.appendChild(this._mountPoint);
        this._reactRoot = ReactDOM.createRoot(this._mountPoint);

        this.handleChange = this.handleChange.bind(this);
    }

    connectedCallback() {
        this._props.placeholder = this.getAttribute('placeholder') || this._props.placeholder;
        this._props.value = this.getAttribute('value') || '';
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this._props[name] !== newValue) {
            this._props[name] = newValue;
            this._render();
        }
    }

    set options(arr) {
        if (Array.isArray(arr)) {
            this._props.options = arr;
            this._render();
        } else {
            console.warn("x-dropdown: 'options' property must be an array.");
        }
    }

    get options() {
        return this._props.options;
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
            console.warn("x-dropdown: 'onChange' property must be a function.");
            delete this._props.onChange;
        }
        this._render();
    }

    handleChange = (event) => {
        const newValue = event.target.value;
        const newLabel = event.target.label;

        this._props.value = newValue;
        this.setAttribute('value', newValue);

        const customEvent = new CustomEvent('change', {
            detail: { value: newValue, label: newLabel },
            bubbles: true,
            composed: true
        });

        console.log('XDropdown despachando CustomEvent:', customEvent);
        this.dispatchEvent(customEvent);

        if (typeof this._props.onChange === 'function') {
            this._props.onChange(customEvent);
        }
        this._render();
    }

    _render() {
        const { placeholder, options, value } = this._props;

        this._reactRoot.render(
            <DropdownComponent
                placeholder={placeholder}
                options={options}
                value={value}
                onChange={this.handleChange}
            />
        );
    }
}

customElements.define('x-dropdown', XDropdown);