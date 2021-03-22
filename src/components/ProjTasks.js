import {useState} from "react"
import {Item, Card} from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import Task from "./Task"

function ProjTasks({project, home, setSingleSelected}) {
    const [isHome, setIsHome]  = useState(home)
    const currentUser = useSelector(state => state.user)
    const {tasks} = currentUser
    const {id, title, notes, priority} = project
    let projectId = id



    const renderTasks = tasks.filter(task => task.project.id === id)
    .map(task => (
        <Task 
            key={task.id}
            task={task}
            upcoming={false}
            completed={task.completed}
            canAssign={false}
        />
    ))


    return (
        <Card >
            <Card.Content >
                <Card.Header >
                <Link 
                    to={`/projects/${projectId}`} 
                    onClick={() => setSingleSelected(true)} >
                    {title}
                </Link>
                </Card.Header>
                <Card.Meta>Priority {priority} </Card.Meta>
                <Card.Description>
                    <strong>{!!isHome ? "Tasks" : "Notes"} </strong>
                    {!!isHome ? renderTasks : notes}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default ProjTasks

