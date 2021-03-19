import React, {useState} from "react"
import { GoogleLogin } from "react-google-login";
import {Form} from 'semantic-ui-react'


function Login() {
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
        e.preventDefault()
        console.log(formData)
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
      </div>
    )
}

export default Login