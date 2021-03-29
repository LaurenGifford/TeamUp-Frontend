import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch, useHistory, Link} from "react-router-dom";
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
import { Menu, Segment, Icon } from "semantic-ui-react";
import { GoogleLogin } from "react-google-login";



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

  useDocumentTitle("TeamUp")

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

//   useEffect(() => {
//     getTasks()
//     .then(data => {
//         dispatch(showTasks(data))
//     })
// }, [])

//   useEffect(() => {
//     getProjects()
//     .then(data => {
//         dispatch(showProjects(data))
//     })
//   }, [])

  function Introduction() {
    return (
      <div id="intro">
        <Segment id="welcome" raised vertical >
          <h1>Welcome to TeamUp!</h1>
          <p>A tasksharing app for teams to track projects, tasks, and teammate assignments. Get started today!</p>
        </Segment>
        <Menu id='login-menu' vertical>
          <Menu.Item 
          name='login'
          >
            <Link to="/login">Login <Icon name='sign in'/></Link>
          </Menu.Item>
          <Menu.Item
          name='signup'>
            <Link  to="/signup">Signup <Icon name='signup'/></Link>
          </Menu.Item>
        </Menu>
      </div>
    )

  }



  return (
    <div className='app' >
      <Header setSingleSelected={setSingleSelected}/>
        <main className="app-body" >
          <Switch>
            <Route exact path="/">
              <Introduction />
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
            </> 
            : <>
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
    </div>
  );
}

export default App;
