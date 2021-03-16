import { Link, useHistory } from "react-router-dom";

function Header({projectId, setCurrentUser, currentUser}) {
    const history = useHistory()

    function handleLogout() {
        setCurrentUser(2)
        history.push('/login')
    }


    return (
        // semantic menu
        <header className="header">
            <h1>TeamUp!</h1>
            <Link className="header-element" to="/signup">Signup</Link>
            <Link className="header-element" to="/login">Login</Link>
            <Link className="header-element" to="/home">Home</Link>
            <Link className="header-element" to="/projects">Projects</Link>
            {/* <Link to={`/projects/${projectId}`}></Link> */}
            <Link className="header-element" to="/calendar">Calendar</Link>
            <button className="header-element" id="logout" onClick={handleLogout}>Logout</button>
        </header>
    )
}

export default Header