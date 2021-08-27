import React from 'react';
import Logo from '../../assets/img/header__logo.svg'
import './navbar.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

function Navbar(props) {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return (
        <div className='navbar'>
          <div className="container">
              <img src={Logo} alt='logo' className='navbar__logo'/>
              <div className='navbar__header'>MERN CLOUD</div>
              {
                  isAuth ? <div className='navbar__logout' onClick={() => dispatch(logout())}>Выйти</div>
                      : <>
                          <div className='navbar__login'><NavLink to='/login'>Войти</NavLink> </div>
                          <div className='navbar__registration'><NavLink to='/registration'>Регистрация</NavLink> </div>
                      </>
              }
          </div>
        </div>
    );
}

export default Navbar;