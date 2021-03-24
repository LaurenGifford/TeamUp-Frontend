import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch, useHistory} from "react-router-dom";
import {Helmet} from "react-helmet"
import {getTasks} from "../api/tasks"
import {showTasks} from "../redux/tasksSlice"
import {getProjects} from "../api/projects"
import {showProjects} from "../redux/ProjectsSlice"
import { getUser } from "../api/user";
import {showUser} from "../redux/userSlice"
import Header from "./Header"
import Login from "./Login"
import SignUp from "./Signup"
import MyCalendar from "./Calendar"
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
  const [singleSelected, setSingleSelected] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory()
  const match = useRouteMatch()

  const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID
  const API_KEY = process.env.REACT_APP_API_KEY
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID_2

  useDocumentTitle("TeamUp!")

  // useEffect(() => {
  //   fetch("http://localhost:3000/autologin", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.token}`,
  //     },
  //   })
  //     .then((r) => {
  //       if (!r.ok) throw Error("Not logged in!");
  //       return r.json();
  //     })
  //     .then((user) => dispatch(showUser(user)))
  //     .catch((err) => console.error(err));
  // }, []);

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
      <Header setSingleSelected={setSingleSelected}/>
        <main >
          <Switch>
            <Route exact path="/">
              <h1>Welcome to TeamUp!</h1>
            </Route>
            {!!currentUser ? <>
            <Route path="/home">
              <Dashboard setSingleSelected={setSingleSelected} />
            </Route>
            <Route path="/projects">
              <Projects singleSelected={singleSelected} setSingleSelected={setSingleSelected}/>
            </Route>
            <Route path="/calendar">
              <MyCalendar />
            </Route>
            </> : <>
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
