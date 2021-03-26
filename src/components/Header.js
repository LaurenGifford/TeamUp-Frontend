import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Button, Icon} from 'semantic-ui-react'
import {showUser} from "../redux/userSlice"

function Header({setCurrentUser, setSingleSelected}) {
    const currentUser = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()

    function handleLogout() {
        localStorage.removeItem("token");
        dispatch(showUser(null))
        history.push('/login')
    }


    return (
        <header className="header">
            <h1 id="app-header" className="header-element">TeamUp!</h1>
            {!currentUser ? <>
                <NavLink className="header-element" to="/signup">Signup</NavLink>
                <NavLink className="header-element" to="/login">Login</NavLink>
            </> : <>
                <NavLink className="header-element" to="/home">Home <Icon name='home'/></NavLink>
                <NavLink className="header-element" to="/projects" 
                    onClick={() => setSingleSelected(false)}>
                    Projects <Icon name='folder'/>
                </NavLink>
                <NavLink className="header-element" to="/calendar">Calendar <Icon name='calendar alternate' /></NavLink>
                <button className="header-element" id="logout" onClick={handleLogout}>Logout</button>
            </>}
        </header>
    )
}

export default Header