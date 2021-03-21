import React, {useState, useEffect} from "react"
import {Form, Label} from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { getUser } from "../api/user";
import {showUser} from "../redux/userSlice"


function Signup() {
  const dispatch = useDispatch()
  const history = useHistory()
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

    const departmentOptions = teams.map(team => (
      <option value={team.id} key={team.id} >{team.department}</option>
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
        team_id: parseInt(team_id)
      }

    fetch("http://localhost:3000/teammates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedData),
  })
    .then((r) => r.json())
    .then((data) => {
      const { teammate, token } = data;
      dispatch(showUser(teammate));
      localStorage.token = token;
    });
    history.push("/home");

  }

    const { name, password, team_id } = formData;

    return (
        <div className="signup-form">
        <Form onSubmit={handleSubmit} autoComplete="off">
          <h1>Signup</h1>

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
            </Form.Group>
            <Label >Department</Label>
            <select
                label="Department"
                placeholder="Select Department"
                name="team_id"
                value={team_id}
                onChange={handleChange}>{departmentOptions}</select>

            <br />
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

export default Signup


