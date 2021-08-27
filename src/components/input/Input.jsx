import React from 'react';
import './input.scss'
const Input = ({type, placeholder, value, handleChange}) => {

    return (
        <input onChange={e => handleChange(e.target.value)}
               value={value}
               type={type}
               placeholder={placeholder} />
    );
};

export default Input;