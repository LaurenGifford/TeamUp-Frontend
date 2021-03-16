import React, {useState} from "react"
import {Form} from 'semantic-ui-react'

function AddTask({project, onTaskAdd}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        status: "not started",
        project_id: parseInt(project.id),
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
        // onTaskAdd()
    }

    const {title, description, due_date} = project

    return (
        <div className="new-task">
        <Form onSubmit={handleSubmit} autoComplete="off">
        <h2>ADD TASK</h2>
        <Form.Group widths="equal">
        <Form.Input fluid
            label="Title"
            placeholder="Title"
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
        />
        {/* <Form.Input width={5}
            label="Priority"
            placeholder="Priority"
            type="number"
            name="priority"
            min="1"
            max="10"
            value={priority}
            onChange={handleChange}
        /> */}
        </Form.Group>
        <Form.Input 
            label="Description"
            placeholder="Description"
            type="textarea"
            name="description"
            value={description}
            onChange={handleChange}
            />
        <Form.Button content="Submit" />
    </Form>
    </div>
    )
}

export default AddTask