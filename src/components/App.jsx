import Navbar from "./navbar/Navbar";
import './app.scss'
import {Switch, Route} from 'react-router-dom'
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "../actions/user";
import Disk from "./disk/Disk";
import {Redirect} from 'react-router-dom'
import Profile from "./profile/profile";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
        }
        , [dispatch])
    return (
        <div className="app">
            <Navbar/>
            <div className="wrap">
                {!isAuth ?
                <Switch>
                    <Route path='/registration' component={Registration}/>
                    <Route path='/login' component={Login}/>
                    <Redirect to='/login'/>
                </Switch>
                :
                <Switch>
                    <Route path='/' component={Disk} exact/>
                    <Route path='/profile' component={Profile} exact/>
                    <Redirect to='/'/>
                </Switch>}
            </div>
        </div>
    );
}

export default App;
