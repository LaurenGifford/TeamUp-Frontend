import { useDispatch, useSelector } from "react-redux";
import React, {useState} from "react"
import { Link, NavLink, useHistory } from "react-router-dom";
import { Button, Icon, Menu} from 'semantic-ui-react'
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
            <div id="app-logo" ></div>
            {currentUser &&
            // <>
            //     <NavLink className="header-element" to="/signup">Signup</NavLink>
            //     <NavLink className="header-element" to="/login">Login</NavLink>
            // </>
            // <Menu id='link-container' pointing secondary text>
            //     <Menu.Item name="home" active={activeItem === 'home'} onClick={handleItemClick}>
            //     <NavLink className="header-element" to="/home">Home <Icon name='home'/></NavLink>
            //     </Menu.Item>
            //     <Menu.Item name="projects" active={activeItem === 'projects'} onClick={handleItemClick}>
            //     <NavLink className="header-element" to="/projects" 
            //         onClick={() => setSingleSelected(false)}>
            //         Projects <Icon name='folder'/>
            //     </NavLink>
            //     </Menu.Item>
            //     <Menu.Item name="calendar" active={activeItem === 'calendar'} onClick={handleItemClick}>
            //     <NavLink className="header-element" to="/calendar">Calendar <Icon name='calendar alternate' /></NavLink>
            //     </Menu.Item>
            //     <Menu.Item name="logout" active={activeItem === 'logout'} onClick={handleItemClick}>
            //     <button className="header-element" id="logout" onClick={handleLogout}>Logout <Icon name='sign out'/></button>
            //     </Menu.Item>
            // </Menu>
            <div id='link-container'>
            <NavLink className="header-element" to="/home">Home <Icon name='home'/></NavLink>
            <NavLink className="header-element" to="/projects" 
                onClick={() => setSingleSelected(false)}>
                Projects <Icon name='folder'/>
            </NavLink>
            <NavLink className="header-element" to="/calendar">Calendar <Icon name='calendar alternate' /></NavLink>
            <button className="header-element" id="logout" onClick={handleLogout}>Logout <Icon name='sign out'/></button>
        </div>
            }
        </header>
    )
}

export default Header