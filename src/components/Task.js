function Task({task}) {
    const {title, description, due_date, status} = task

    // const showTeammates = task.teammates.map(tm => (
    //     <small>
    //         {tm.name} | {tm.points}
    //     </small>
    // ))

    return (
        <li>
            {title}
            {/* {task.teammates ? 
            {showTeammates} : 
            <p>No teammates for this task</p>} */}
        </li>
    )
}

export default Task