
import React, {useEffect, useState} from "react"
import { useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import {Form, Icon, Transition} from 'semantic-ui-react'
import {showUser} from "../redux/userSlice"
import {getTasks} from "../api/tasks"
import {showTasks} from "../redux/tasksSlice"
import {getProjects} from "../api/projects"
import {showProjects} from "../redux/ProjectsSlice"


function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [errors, setErrors] = useState([])
  const [departmentSelected, setDepartmentSelected] = useState(false)
  const [department, setDepartment] = useState(0)
  const [formData, setFormData] = useState({
      name: "",
      password: ""
  })
  const [teams, setTeams] = useState([])

  useEffect(() => {
    fetch(`http://teamup-task-app.herokuapp.com/teams`)
    .then(r => r.json())
    .then(data => {
      setTeams(data)})
  }, [])

  const departmentOptions = teams.map(team => ({
    value: team.id, key: team.id, text: team.department}
  ))

  function handleChange(e) {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://teamup-task-app.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((r) => {
      if (r.ok) {
        return r.json()
      } else {return r.json().then(data => {
        throw data
      })
      }
    })
    .then((data) => {
      const { teammate, token } = data;
      dispatch(showUser(teammate))
      localStorage.token = token;
      getProjectsAndTasks()
      history.push("/home")
    })
    .catch((data) => {
      setErrors([...errors, data.error]);
    });
  }

  function handleGoogleLogin(response) {
    if (response.tokenId) {
      fetch("http://teamup-task-app.herokuapp.com/google_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.tokenId}`,
        },
      })
      .then((r) => {
        if (r.ok) {
          return r.json()
        } else {return r.json().then(data => {
          throw data
        })
        }
      })
        .then((data) => {
          if (data.teammate.id){
            const { teammate, token } = data;
            dispatch(showUser(teammate))
            localStorage.token = token;
            getProjectsAndTasks()
            history.push("/home")
        }
          else {
            setErrors([...errors, "Account not found. You may need to signup!"])
          }
        })
        .catch((data) => {
          setErrors([...errors, data.error]);
        });
    }
  };

  function getProjectsAndTasks() {
    getTasks()
    .then(data => {
        dispatch(showTasks(data))
    })

    getProjects()
    .then(data => {
        dispatch(showProjects(data))
    })
  }

  const { name, password,} = formData;

    return (
      <Transition visible={true} transitionOnMount={true} animation='zoom' duration={800}>
        <div className="login-signup-form" >
          <h1> <Icon name='sign in'/> Login</h1>
          <br />
        <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input
                placeholder="Name"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
            />
            <Form.Input
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange}
            /> 
            <Form.Button color='grey' content="Submit" />
        </Form>
        <br />
          <div>
            <h2>-------- OR -------- </h2>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID_TEST}
              buttonText="Login"
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLogin}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        {errors.map(err => <p style={{ color: "red" }}>{err}</p>)}
      </div>
      </Transition>
    )
}

export default Login