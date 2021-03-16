// import logo from './logo.svg';
// import './App.css';

import React, {useState, useEffect} from "react"
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import Header from "./Header"
import Login from "./Login"
import SignUp from "./Signup"
import Calendar from "./Calendar"
import ProjectPage from "./ProjectPage"
import Dashboard from "./Dashboard"
import Projects from "./Projects"



export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title]);
}

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  // const [projects, setProjects] = useState([])
  const [myProjects, setMyProjects] = useState([])
  const match = useRouteMatch()
  let params = useParams()

  useDocumentTitle("TeamUp!")

  useEffect(() => {
    fetch(`http://localhost:3000/teammates/1`)
    .then(r => r.json())
    .then(data => {
      setCurrentUser(data)
      setMyProjects(data.projects)
    })
  }, [])

  console.log(params, match)

  // path={`${match.url}/:projectId`}

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
            <Route path={`projects/:projectId`} render={({match}) => (
              <ProjectPage project={myProjects.find(p => p.id === match.params.projectId)}/>
            )}
            />
            {/* <Route path={`projects/:projectId`}>

              <ProjectPage projects={myProjects}/>
            </Route> */}
            <Route exact path="/projects">
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
