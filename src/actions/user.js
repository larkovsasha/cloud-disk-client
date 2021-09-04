import axios from 'axios'
import {setUser} from "../reducers/userReducer";


export const registration = async (email, password) => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/registration', {
            email,
            password
        })
            alert(res.data.message)
    } catch (e) {
        alert(e)
    }
}

export const login = (email, password) => {

    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            })
            dispatch(setUser(res.data.user))
            window.localStorage.setItem('token', res.data.token)

        } catch (e) {
            alert(e)
        }
    }
}

export const auth = () => {

    return async dispatch => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/auth', {headers: {Authorization: `Bearer ${ localStorage.getItem('token')}`}})
            //console.log(res)
            dispatch(setUser(res.data.user))
            localStorage.setItem('token', res.data.token)
        } catch (e) {
            console.log(e)
            localStorage.removeItem('token')
        }
    }
}