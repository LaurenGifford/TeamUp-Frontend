import {List} from "semantic-ui-react"
import Task from "./Task"

function Unassigned({tasks}) {

    const renderTasks = tasks.map(task => (
        <Task 
            key={task.id}
            task={task}
        />
    ))


    return (
        <div>
            <h4>Unnasigned Tasks</h4>
            <List items={renderTasks} />
        </div>
    )
}

export default Unassigned