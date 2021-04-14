import React, {useState} from "react"
import {Form, Transition, Icon, Segment, Header, Button, Modal} from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import {addToProjects} from "../redux/ProjectsSlice"

function AddProj({team,}) {
    const [formData, setFormData] = useState({
        title: "",
        priority: "",
        notes: "",
        team_id: parseInt(team.id),
    })
    const [showForm, setShowForm] = useState(false)
    // const [formModal, setFormModal]  = useState(false)
    const dispatch = useDispatch()

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleAddProject(e) {
        e.preventDefault()
        const formattedData = {
            ...formData,
            priority: parseInt(priority)
        }
        // onProjectAdd(formattedData)

        fetch(`http://teamup-task-app.herokuapp.com/projects`, {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(formattedData)
        })
        .then(r => r.json())
        .then(data => dispatch(addToProjects(data)))
        setFormData({
            title: "",
            priority: "",
            notes: "",
            team_id: parseInt(team.id),
        })
    }

    const {title, priority, notes} = formData

    return (
        <Segment className="new-project" >
            <h3 onClick={() => setShowForm(!showForm)} >
            <Icon name='folder'/> ADD PROJECT <Icon name='plus' />
            </h3>
            <Transition visible={showForm} animation='slide down' show={600} hide={600}>
                <Form onSubmit={handleAddProject} autoComplete="off" 
                style={{padding: '20px', borderRadius: '10px'}}>

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
                    <Form.Button color='grey' content="Submit" />
                </Form>
            </Transition>
         </Segment> 
    )
}

export default AddProj