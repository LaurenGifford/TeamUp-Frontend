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
        <div>Upcoming Tasks
        <ul>
            {renderTasks}
        </ul>
    </div>
    )
}

export default Upcoming