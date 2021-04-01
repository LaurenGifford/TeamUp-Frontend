import React, {useState, useEffect} from "react"
import {Form, Label, Dropdown, Icon, Transition} from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { getUser } from "../api/user";
import {showUser} from "../redux/userSlice"
import {getTasks} from "../api/tasks"
import {showTasks} from "../redux/tasksSlice"
import {getProjects} from "../api/projects"
import {showProjects} from "../redux/ProjectsSlice"


function Signup() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [errors, setErrors] = useState([])
  const [departmentSelected, setDepartmentSelected] = useState(false)
  const [department, setDepartment] = useState(0)
  const [formData, setFormData] = useState({
      name: "",
      password: "",
      team_id: "",
      points: 0
  })
  const [teams, setTeams] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/teams`)
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
      e.preventDefault()
      const formattedData = {
        ...formData,
        team_id: department
      }

      fetch("http://localhost:3000/teammates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    })
      .then((r) => {
              if (r.ok) {
                return r.json()
              } else {return r.json().then(data => {
                console.log(data)
                throw data
              })
            }
          })
      .then((data) => {
        const { teammate, token } = data;
        dispatch(showUser(teammate));
        localStorage.token = token;
        getProjectsAndTasks()
        history.push("/home");
      })
      .catch((data) => {
        console.log(data.error)
        setErrors(data.error);
      });
  }


  function handleGoogleLogin(response) {
    if (response.tokenId) {
      fetch("http://localhost:3000/google_login", {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.tokenId}`,
        },
        body: JSON.stringify({team_id: department, points: 0})
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
          console.log(data);
          const { teammate, token } = data;
          dispatch(showUser(teammate))
          localStorage.token = token;
          getProjectsAndTasks()
          history.push("/home");
        })
        .catch((data) => {
          setErrors(data.error);
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

    const { name, password, team_id } = formData;

    return (
      <Transition visible={true} transitionOnMount={true} animation='zoom' duration={800}>
        <div className="login-signup-form">
          <h1><Icon name='signup'/> Signup</h1>
          <br></br>
          {!departmentSelected ?
            <Form onSubmit={() => setDepartmentSelected(true)}>
            <h4 >Choose Your Department</h4>
            <Dropdown
                selection
                closeOnBlur
                fluid
                placeholder="Select Department"
                value={department}
                options={departmentOptions}
                onChange={(e, data) =>{
                  console.log(e, data, department)
                  setDepartment(data.value)
                  }}>
            </Dropdown>
            <Form.Button color='grey' >Confirm</Form.Button>
          </Form>
          : <>
          <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Input
                  // label="Name"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
              />

              <Form.Input
                  // label="Password"
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
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID_2}
              buttonText="Login"
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLogin}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={true}
            />
          </div>

          </>}
          {errors.map(err => <p style={{ color: "red" }}>{err}</p>)}
      </div>
      </Transition>
    )
}

export default Signup


