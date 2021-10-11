import React, {useState} from 'react';
import Logo from '../../assets/img/header__logo.svg'
import './navbar.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import defaultAvatar from '../../assets/img/defaultUser.svg'
import {API_URL} from "../../config";

function Navbar(props) {
    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const sort = useSelector(state => state.files.sort)
    const user = useSelector(state => state.user.currentUser)
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    console.log(user.avatar)
    const avatar = user.avatar ? `${API_URL + user.avatar}` : defaultAvatar




    function searchNameHandler(e){
        setSearchName(e.target.value)

        if(searchTimeout){
            clearTimeout(searchTimeout)
        }
        if(e.target.value != ''){
            setSearchTimeout(setTimeout(value => {
                dispatch(searchFiles(e.target.value))
            }, 500, e.target.value))
        }else{
            dispatch(getFiles(currentDir, sort))
        }

    }
    return (
        <div className='navbar'>
            <div className="container">
                <img src={Logo} alt='logo' className='navbar__logo'/>
                <div className='navbar__header'>MERN CLOUD</div>
                {
                    isAuth ?
                        <>
                            <input
                                onChange={searchNameHandler}
                                value={searchName}
                                placeholder='Введите имя файла'
                                className='navbar__search'
                                type="text"
                            />

                            <div className='navbar__email'>{user.email}</div>
                            <NavLink to='profile'>
                                <img src={avatar} alt='user avatar' className='navbar__avatar'/>
                            </NavLink>
                            <div className='navbar__logout' onClick={() => dispatch(logout())}>Выйти</div>
                        </>
                        : <>
                            <div className='navbar__login'><NavLink to='/login'>Войти</NavLink></div>
                            <div className='navbar__registration'><NavLink to='/registration'>Регистрация</NavLink></div>
                        </>
                }
            </div>
        </div>
    );
}

export default Navbar;