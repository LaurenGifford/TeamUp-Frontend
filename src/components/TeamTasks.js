import {Grid, Card} from "semantic-ui-react"
import Task from "./Task"
import {getTasks} from "../api/tasks"
import {showTasks} from "../redux/tasksSlice"
import { useDispatch, useSelector } from "react-redux";

function TeamTasks({member, tasks}) {
    const dispatch = useDispatch()
    const {id, name, points} = member
    
    const myTasks = tasks.filter(task => {
        if (task.teammates.find(tm => tm.id === id)){
            return task
        }
    })

    const renderTasks = myTasks.map(task => (
        <Task 
            key={task.id}
            task={task}
            upcoming={false}
            canAssign={true}
            completed={task.completed}
            onDelete={deleteUrTask}
        />
    ))

    function deleteUrTask(taskId) {
        console.log(myTasks)
        const allUrTasks = myTasks.map(task => task.ur_tasks)
        const thisUrTask = allUrTasks.find(urTasks => {
            // debugger
            if (urTasks.find(ur => {
                if (ur.task_id === taskId && ur.teammate_id === id) {
                    return ur
            }
            })) {return urTasks}
        })
        console.log(allUrTasks, thisUrTask)
        fetch(`http://localhost:3000/ur_tasks/${thisUrTask[0].id}`, {
            method: "DELETE"
        })
        getTasks()
        .then(data => {
            dispatch(showTasks(data))
        })
    }

    
    return (
        <Card >
            <Card.Content >
                <Card.Header >
                    {name}
                </Card.Header>
                <Card.Meta>{points}</Card.Meta>
            </Card.Content>
            <Card.Content >
                <Card.Description>
                    <strong>Tasks</strong>
                    {renderTasks}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default TeamTasks