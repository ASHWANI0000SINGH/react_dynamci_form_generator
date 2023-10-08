// src/components/FormField.js
import React from 'react';

function FormField({ field }) {
  return (
    <div>
      <label>{field.label}</label>
      {field.type === 'text' && <input type="text" />}
      {field.type === 'dropdown' && (
        <select>
          {field.options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default FormField;
