import {List} from "semantic-ui-react"
import Task from "./Task"

function Unassigned({tasks}) {

    const renderTasks = tasks.filter(task => {
        if (task.teammates.length === 0) {
            return task
        }
    })
    .map(task => (
        <Task 
            key={task.id}
            task={task}
            upcoming={false}
            completed={task.status === "completed" ? true : false}
        />
    ))


    return (
        <div>
            <h3>Unassigned Tasks</h3>
            <List items={renderTasks} />
        </div>
    )
}

export default Unassigned