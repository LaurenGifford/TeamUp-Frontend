import {useState} from "react"
import {AiOutlineEdit} from "react-icons/ai"
import {Checkbox} from 'semantic-ui-react'


function Task({task, upcoming, completed}) {
    const [complete, setComplete] = useState(completed)
    const {id, title, description, due_date, status} = task


    function handleComplete() {
        // setComplete(!complete)

        // if (!!complete) {
            fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : 'application/json'
                },
                body: JSON.stringify({status: "completed"})
            })
            .then(r => r.json())
            .then(data => console.log(data))
        // }
    }

    return (
        <li>
            <span> 
                {!!upcoming ? 
                <Checkbox label='Mark as Complete' onChange={handleComplete}
                /> : <AiOutlineEdit/>}
                <strong className={complete ? "completed" : undefined}>  {title} </strong>
            </span> 
            <br />
            <span>{due_date}</span>
            {/* {task.teammates ? 
            {showTeammates} : 
            <p>No teammates for this task</p>} */}
        </li>
    )
}

export default Task