
import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { getUser } from "../api/user";
import {showUser} from "../redux/userSlice"
import {Form} from 'semantic-ui-react'


function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
    const [formData, setFormData] = useState({
        name: "",
        password: ""
    })

    

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
          console.log(data);
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
        })
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            const { teammate, token } = data;
            dispatch(showUser(teammate))
            localStorage.token = token;
          });
      }
    };

    const { name, password,} = formData;

    return (
        <div className="login-form">
        <Form onSubmit={handleSubmit} autoComplete="off">
          <h1>Login</h1>

            <Form.Group>
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
            </Form.Group>
            <Form.Button content="Submit" />

        </Form>
        <hr />
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID_2}
            buttonText="Login"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={"single_host_origin"}
            // isSignedIn={true}
          />
        </div>
      </div>
    )
}

export default Login