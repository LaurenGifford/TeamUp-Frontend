import { useDispatch, useSelector } from "react-redux";
import React, {useState} from "react"
import { Link, NavLink, useHistory } from "react-router-dom";
import {Icon} from 'semantic-ui-react'
import {showUser} from "../redux/userSlice"

function Header({setCurrentUser, setSingleSelected}) {
    const currentUser = useSelector(state => state.user)
    const [activeItem, setActiveItem] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()

    function handleLogout() {
        localStorage.removeItem("token");
        dispatch(showUser(null))
        history.push('/login')
    }

    function handleItemClick(e, {name}) {
        setActiveItem(name)
    }


    return (
        <header className="header">
            <div id="app-logo" onClick={() => history.push('/')}><Link to="/"/></div>
            {currentUser &&
            <div id='link-container'>
            <NavLink className="header-element" to="/home">HOME <Icon name='home'/></NavLink>
            <NavLink className="header-element" to="/projects" 
                onClick={() => setSingleSelected(false)}>
                PROJECTS <Icon name='folder'/>
            </NavLink>
            <NavLink className="header-element" to="/calendar">CALENDAR <Icon name='calendar alternate' /></NavLink>
            <button className="header-element" id="logout" onClick={handleLogout}>LOGOUT <Icon name='sign out'/></button>
        </div>
            }
        </header>
    )
}

export default Header