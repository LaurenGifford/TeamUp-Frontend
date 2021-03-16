import React, {useState} from "react"
import {Form} from 'semantic-ui-react'

function AddProj({team, onProjectAdd}) {
    const [formData, setFormData] = useState({
        title: "",
        priority: "",
        notes: "",
        team_id: parseInt(team.id),
    })

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
            priority: parseInt(priority)
        }
        console.log(formattedData)

        fetch(`http://localhost:3000/projects`, {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(formattedData)
        })
        .then(r => r.json())
        .then(data => onProjectAdd(data))
        setFormData({
            title: "",
            priority: "",
            notes: "",
            team_id: parseInt(team.id),
        })
    }

    const {title, priority, notes} = formData

    return (
        <div className="new-project">
            <Form onSubmit={handleSubmit} autoComplete="off">
            <h2>ADD PROJECT</h2>
            <Form.Group widths="equal">
            <Form.Input fluid
                label="Title"
                placeholder="Title"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
            />
            <Form.Input width={5}
                label="Priority"
                placeholder="Priority"
                type="number"
                name="priority"
                min="1"
                max="10"
                value={priority}
                onChange={handleChange}
            />
            </Form.Group>
            <Form.Input 
                label="Notes"
                placeholder="Notes"
                type="textarea"
                name="notes"
                value={notes}
                onChange={handleChange}
                />
            <Form.Button content="Submit" />
        </Form>
        </div>
    )
}

export default AddProj