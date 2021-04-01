import {Grid, Card, Icon, Transition} from "semantic-ui-react"
import Task from "./Task"
import {getTasks} from "../api/tasks"
import {showTasks} from "../redux/tasksSlice"
import { useDispatch, useSelector } from "react-redux";

function TeamTasks({member, tasks, project}) {
    const dispatch = useDispatch()
    const allTasks = useSelector(state => state.tasks)
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
            canDelete={true}
            canAssign={true}
            completed={task.completed}
            onDelete={deleteUrTask}
        />
    ))

    function deleteUrTask(taskId) {
        const task = allTasks.find(task => task.id === taskId)
        const urTask = task.ur_tasks.find(ur => ur.teammate_id === id)            
        fetch(`http://localhost:3000/ur_tasks/${urTask.id}`, {
            method: "DELETE"
        })
        getTasks()
        .then(data => {
            dispatch(showTasks(data))
        })
    }

    
    return (
        <Transition visible={true} transitionOnMount={true} animation='vertical flip' duration={800}>
        <Card >
            <Card.Content >
                <Card.Header >
                    {name}
                </Card.Header>
                <Card.Meta id='points'>{points}  <Icon name='money' /></Card.Meta>
            </Card.Content>
            <Card.Content >
                <Card.Description>
                    {/* <strong>Tasks</strong> */}
                    {renderTasks}
                </Card.Description>
            </Card.Content>
        </Card>
        </Transition>
    )
}

export default TeamTasks