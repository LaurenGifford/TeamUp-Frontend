import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch} from "react-router-dom";
import {getTasks} from "../api/tasks"
import {showTasks} from "../redux/tasksSlice"
import {getProjects} from "../api/projects"
import {showProjects} from "../redux/ProjectsSlice"
import { getUser } from "../api/user";
import {showUser} from "../redux/userSlice"
import Header from "./Header"
import Login from "./Login"
import SignUp from "./Signup"
import Calendar from "./Calendar"
import Dashboard from "./Dashboard"
import Projects from "./Projects"
import ProjectPage from "./ProjectPage"



export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title]);
}

function App() {
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch();
  const match = useRouteMatch()


  useDocumentTitle("TeamUp!")

  useEffect(() => {
    getUser(1)
    .then(data => {
      dispatch(showUser(data))
    })
  }, [])

  useEffect(() => {
    getTasks()
    .then(data => {
        dispatch(showTasks(data))
    })
}, [])

  useEffect(() => {
    getProjects()
    .then(data => {
        dispatch(showProjects(data))
    })
  }, [])



  return (
    <>
      <Header/>
        <main>
          <Switch>
            {!!currentUser && <>
            <Route path="/home">
              <Dashboard />
            </Route>
            <Route path="/projects">
              <Projects/>
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
          {/* <Switch >
            <Route path={`${match.url}/:projectId`}>
                <ProjectPage />
            </Route>
            </Switch> */}
        </main>
    </>
  );
}

export default App;
