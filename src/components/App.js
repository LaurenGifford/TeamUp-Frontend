// import logo from './logo.svg';
// import './App.css';

import React, {useState, useEffect} from "react"
import { Switch, Route } from "react-router-dom";
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
  const [projectId, setProjectId] = useState(1)
  const [myProjects, setMyProjects] = useState([])

  useDocumentTitle("TeamUp!")

  useEffect(() => {
    fetch(`http://localhost:3000/teammates/1`)
    .then(r => r.json())
    .then(data => {
      setCurrentUser(data)
      console.log(data)
      // setTimeout(getProjects, 1000)
    })
  }, [])


  useEffect(() => {
    if (!!currentUser){ 
    fetch(`http://localhost:3000/projects`)
    .then(r => r.json())
    .then(projects => { console.log(projects)
      const filteredProjects = projects.filter(project => {
        console.log(project, currentUser)
        return project.team.id === currentUser.team.id
      })
      setMyProjects(filteredProjects)
    })}
  }, [])


  // function getProjects(){
  //   currentUser &&
  //   fetch(`http://localhost:3000/projects`)
  //   .then(r => r.json())
  //   .then(projects => { console.log(projects)
  //     const filteredProjects = projects.filter(project => {
  //       console.log(project, currentUser)
  //       return project.team.id === currentUser.team.id
  //     })
  //     setMyProjects(filteredProjects)
  //   })
  // }


  return (
    <>
      <Header projectId={projectId} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
        <main>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="login">
              <Login />
            </Route>
            {currentUser ? <>
            <Route path="/home">
              <Dashboard 
              currentUser={currentUser} 
              myProjects={myProjects}
              />
            </Route>
            <Route path="/projects">
              <Projects myProjects={myProjects}/>
            </Route>
            <Route path="/projects/:projectId">
              <ProjectPage />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>  </> :
            <h2>Loading</h2>
            }
          </Switch>
        </main>
    </>
  );
}

export default App;
