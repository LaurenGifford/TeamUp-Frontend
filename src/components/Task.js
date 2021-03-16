function Task({task}) {
    const {title, description, due_date, status} = task


    return (
        <li>
            {title}
        </li>
    )
}

export default Task