
import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { getUser } from "../api/user";
import {showUser} from "../redux/userSlice"
import {Form, Dropdown, Label, Segment} from 'semantic-ui-react'


function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [departmentSelected, setDepartmentSelected] = useState(false)
  const [department, setDepartment] = useState(0)
  const [formData, setFormData] = useState({
      name: "",
      password: ""
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
      e.preventDefault();
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((r) => r.json())
        .then((data) => {
          const { teammate, token } = data;
          dispatch(showUser(teammate))
          localStorage.token = token;
          history.push("/home")
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
            .then((r) => r.json())
            .then((data) => {
              const { teammate, token } = data;
              dispatch(showUser(teammate))
              localStorage.token = token;
              history.push("/home");
            });
        }
    };

    const { name, password,} = formData;

    return (
        <div className="login-signup-form" >
          <h1>Login</h1>
          {!departmentSelected ?
          <Form onSubmit={() => setDepartmentSelected(true)}>
            <h4 >Choose Your Department</h4>
            <Dropdown
                selection
                closeOnBlur
                // fluid
                placeholder="Select Department"
                value={department}
                options={departmentOptions}
                onChange={(e, data) =>{
                  setDepartment(data.value)
                  }}>
            </Dropdown>
            <Form.Button >Confirm</Form.Button>
          </Form>
          : <>
        <Form onSubmit={handleSubmit} autoComplete="off">
            {/* <Form.Group> */}
            <Form.Input
                label="Name"
                placeholder="Name"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
            />
            <Form.Input
                label="Password"
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange}
            /> 
            <br />
            {/* </Form.Group> */}
            <Form.Button content="Submit" />

        </Form>
        <br />
          <div>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID_TEST}
              buttonText="Login"
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLogin}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={true}
            />
          </div>
        </> }
      </div>
    )
}

export default Login