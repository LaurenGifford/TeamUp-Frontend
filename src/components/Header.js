import { Link, NavLink, useHistory } from "react-router-dom";

function Header({setCurrentUser, currentUser}) {
    const history = useHistory()

    function handleLogout() {
        setCurrentUser(null)
        history.push('/login')
    }


    return (
        // semantic menu
        <header className="header">
            <h1 id="app-header" className="header-element">TeamUp!</h1>
            {!currentUser ? <>
                <NavLink className="header-element" to="/signup">Signup</NavLink>
                <NavLink className="header-element" to="/login">Login</NavLink>
            </> : <>
                <NavLink className="header-element" to="/home">Home</NavLink>
                <NavLink className="header-element" to="/projects">Projects</NavLink>
                <NavLink className="header-element" to="/calendar">Calendar</NavLink>
                <button className="header-element" id="logout" onClick={handleLogout}>Logout</button>
            </>}
        </header>
    )
}

export default Header