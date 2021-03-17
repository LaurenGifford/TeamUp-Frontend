import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route} from "react-router-dom";
import Header from "./Header"
import Login from "./Login"
import SignUp from "./Signup"
import Calendar from "./Calendar"
import Dashboard from "./Dashboard"
import Projects from "./Projects"



export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title]);
}

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [myProjects, setMyProjects] = useState([])


  useDocumentTitle("TeamUp!")

  useEffect(() => {
    fetch(`http://localhost:3000/teammates/1`)
    .then(r => r.json())
    .then(data => {
      setCurrentUser(data)
      setMyProjects(data.projects)
    })
  }, [])


  return (
    <>
      <Header setCurrentUser={setCurrentUser} currentUser={currentUser}/>
        <main>
          <Switch>
            {!!currentUser && <>
            <Route path="/home">
              <Dashboard 
              currentUser={currentUser} 
              myProjects={myProjects}
              />
            </Route>
            <Route path="/projects">
              <Projects team={currentUser.team} />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route> 
             {/* </> : <> */}
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            </>
            }
          </Switch>
        </main>
    </>
  );
}

export default App;
