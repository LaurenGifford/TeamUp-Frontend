import {List} from "semantic-ui-react"
import Task from "./Task"
import {useSelector } from "react-redux";



function Upcoming() {
    const currentUser = useSelector(state => state.user)
    // const tasks = useSelector(state => state.tasks)
    // const tms = tasks.map(task => task.teammates)
    const {id, name, points, team_id, tasks} = currentUser

    

    // debugger
    const renderTasks = tasks.map(task => (
        <Task 
            key={task.id}
            task={task}
            userId = {id}
            points={points}
            upcoming={true} 
            completed={task.completed}
        />
    ))

    return (
        <div>
            <h4>Current Tasks</h4>
            {tasks &&
            <List items={renderTasks} />
            }
        </div>
    )
}

export default Upcoming