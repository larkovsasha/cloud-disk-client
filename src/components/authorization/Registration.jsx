import React, {useState} from 'react';
import './authorization.scss'
import Input from "../input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className='registration'>
            <div className='registration__header'>Регистрация</div>
            <Input handleChange={setEmail} value={email}type='text' placeholder='Введите email'> </Input>
            <Input handleChange={setPassword} value={password}type='password' placeholder='Введите пароль'> </Input>
            <button className='registration__btn'
                    onClick={() => {registration(email, password)}}>
                Зарегистриоваться </button>
        </div>
    );
};

export default Registration;

