import React, {useState} from "react"
import { useDispatch } from "react-redux";
import {addToTasks} from "../redux/tasksSlice"
import {Form, Transition, Icon, Segment} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function AddTask({project, onTaskAdd}) {
    const [showForm, setShowForm] = useState(false)
    const [dateValue, setDateValue] = useState(new Date())
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        completed: false,
        project_id: parseInt(project.id),
    })
    const dispatch = useDispatch()

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
            due_date: dateValue,
        }

        fetch(`http://teamup-task-app.herokuapp.com/tasks`, {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(formattedData)
        })
        .then(r => r.json())
        .then(data => {
            dispatch(addToTasks(data))
        })
        
        setFormData({
            title: "",
            description: "",
            due_date: "",
            completed: false,
            project_id: parseInt(project.id),
        })
    }

    const {title, description} = formData

    return (
        <Segment className="new-task">
            <h3 onClick={() => setShowForm(!showForm)}>
                <Icon name='tasks'/> ADD TASK <Icon name='plus' />
            </h3>
            <Transition visible={showForm} animation='slide down' show={600} hide={600}>
                <Form onSubmit={handleSubmit} autoComplete="off" 
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
                    </Form.Group>
                    <Form.Input 
                        label="Description"
                        placeholder="Description"
                        type="textarea"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        />
                        <Form.Field 
                        label='Due Date'>
                        </Form.Field>
                        <DatePicker 
                        selected={dateValue} 
                        isClearable
                        closeOnScroll={true}
                        onChange={(date) => setDateValue(date)} 
                        />
                        <br />
                    <Form.Button color='grey' content="Submit" />
                </Form>
            </Transition>
    </Segment>
    )
}

export default AddTask