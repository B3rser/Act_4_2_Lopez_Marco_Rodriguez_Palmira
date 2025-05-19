import React from 'react';

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
