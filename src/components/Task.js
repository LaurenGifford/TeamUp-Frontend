import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
// import {editUserTask} from "../redux/userSlice"
import {editUser} from "../redux/userSlice"
import {editTask} from "../redux/tasksSlice"
import {AiOutlineEdit} from "react-icons/ai"
import {Checkbox} from 'semantic-ui-react'


function Task({task, upcoming, completed, userId, points}) {
    const [complete, setComplete] = useState(completed)
    const {id, title, description, due_date, status} = task
    const dispatch = useDispatch()

    
    
    function handleComplete() {
        setComplete(!complete)
        
        // if (!!complete) {
            handleTaskEdit()
            handleUserPoints()
        // }
    }

    function handleTaskEdit() {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({status: "completed"})
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            // dispatch(editUserTask(data))
            dispatch(editTask(data))
        })
    }

    function handleUserPoints() {

        fetch(`http://localhost:3000/teammates/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({points: points + 100})
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            dispatch(editUser(data))
        })
    }

    return (
        <li>
            <span> {!complete ?
                <> 
                {!!upcoming ? 
                <Checkbox label='Mark as Complete' onChange={handleComplete} 
                /> : <AiOutlineEdit/>}
                <strong className={complete ? "completed" : undefined}>  {title} </strong>
                </> :
                <strong className={complete ? "completed" : undefined}>  {title} </strong>
                }
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