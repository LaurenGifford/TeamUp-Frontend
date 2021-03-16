import {List} from "semantic-ui-react"
import Task from "./Task"



function Upcoming({currentUser}) {
    const {name, points, team_id, tasks} = currentUser

    const renderTasks = tasks.map(task => (
        <Task 
            key={task.id}
            task={task}
        />
    ))

    return (
        <div>
            <h4>Upcoming Tasks</h4>
            <List items={renderTasks} />
            {/* semantic checkbox to mark as complete */}
        </div>
    )
}

export default Upcoming