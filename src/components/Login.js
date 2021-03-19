import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { getUser } from "../api/user";
import {showUser} from "../redux/userSlice"
import {Form} from 'semantic-ui-react'


function Login() {
  const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        password: ""
    })

    function handleLogin(user) {
      dispatch(showUser(user))
    }

    function handleGoogleLogin(response) {
      // we'll get a tokenId back from Google on successful login that we'll send to our server to find/create a user
      if (response.tokenId) {
        fetch("http://localhost:3000/google_login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.tokenId}`,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            const { user, token } = data;
            // then set that user in state in our App component
            handleLogin(user);
            // also save the id to localStorage
            localStorage.token = token;
          });
      }
    };

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
          const { user, token } = data;
  
          // save the user in state in App
          handleLogin(user);
  
          // also save the id to localStorage
          localStorage.token = token;
        });
    }

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
          {/* {errors.length !== 0 && errors.map((error) => (
            <p key={error} style={{ color: "red" }}>
              {error}
            </p>
          ))} */}
        </Form>
        <hr />
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
      </div>
    )
}

export default Login