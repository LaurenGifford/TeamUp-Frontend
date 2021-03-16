import React, {useState, useEffect} from "react"
import {Form, Label} from 'semantic-ui-react'


function Signup() {
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
        console.log(formattedData)
        const formattedData = {
          ...formData,
          team_id: parseInt(team_id)
        }
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


