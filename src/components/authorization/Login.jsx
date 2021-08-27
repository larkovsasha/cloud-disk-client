import React, {useState} from 'react';
import './authorization.scss'
import Input from "../input/Input";
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    return (
        <div className='registration'>
            <div className='registration__header'>Авторзация</div>
            <Input handleChange={setEmail} value={email}type='text' placeholder='Введите email'> </Input>
            <Input handleChange={setPassword} value={password}type='password' placeholder='Введите пароль'> </Input>
            <button className='registration__btn'
                   onClick={() => dispatch(login(email, password))}>
                Войти </button>
        </div>
    );
};

export default Registration;