import React from 'react';
import './css/Button.css';

const Button = ({ label, priority = 'primary', state = 'default', onClick }) => {
  const isDisabled = state === 'disabled';

  // Solo agregar clase hover si el estado no es explicitamente hover o disabled
  const className = `custom-button ${priority} ${state !== 'default' ? state : ''}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Button;
