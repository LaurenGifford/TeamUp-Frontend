import {List} from "semantic-ui-react"
import Task from "./Task"
import {useSelector } from "react-redux";



function Upcoming() {
    const currentUser = useSelector(state => state.user)
    const tasks = useSelector(state => state.tasks)
    const tms = tasks.map(task => task.teammates)
    const {name, points, team_id} = currentUser

    const renderTasks = tasks.filter(task => {
        // debugger

        return task
    })
    .map(task => (
        <Task 
            key={task.id}
            task={task}
            upcoming={true} 
            completed={task.status === "complete" ? true : false}
        />
    ))

    return (
        <div>
            <h4>Current Tasks</h4>
            <List items={renderTasks} />
            {/* semantic checkbox to mark as complete */}
        </div>
    )
}

export default Upcoming