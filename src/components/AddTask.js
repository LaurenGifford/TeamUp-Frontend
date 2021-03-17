import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {addToTasks} from "../redux/tasksSlice"
import {Form, Transition} from 'semantic-ui-react'
import {AiOutlineArrowDown} from "react-icons/ai"
import DatePicker from "react-multi-date-picker";
// import mobiscroll from "@mobiscroll/react";
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";

function AddTask({project, onTaskAdd}) {
    const [showForm, setShowForm] = useState(false)
    const [dateValue, setDateValue] = useState(new Date())
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        status: "not started",
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
        console.log(formData, dateValue)
        // onTaskAdd()
        fetch(`http://localhost:3000/tasks`, {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(data => dispatch(addToTasks(data)))
        setFormData({
            title: "",
            description: "",
            due_date: "",
            status: "not started",
            project_id: parseInt(project.id),
        })
    }

    const {title, description, due_date} = formData

    return (
        <div className="new-task">
            <h3 onClick={() => setShowForm(!showForm)}>
                ADD TASK <AiOutlineArrowDown/>
            </h3>
            <Transition visible={showForm} animation='fade' duration={600}>
                <Form onSubmit={handleSubmit} autoComplete="off">
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
                        <Form.Field 
                        label='Due Date'>
                        {/* control={<DatePicker value={dateValue} onChange={setDateValue} />} */}
                        </Form.Field>
                        <DatePicker value={dateValue} onChange={() => {
                            console.log(dateValue)
                            setDateValue()}} />
                    <Form.Button content="Submit" />
                </Form>
            </Transition>
    </div>
    )
}

export default AddTask