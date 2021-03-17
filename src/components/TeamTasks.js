import {Grid, Card} from "semantic-ui-react"
import Task from "./Task"

function TeamTasks({member, tasks}) {
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
        />
    ))

    
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