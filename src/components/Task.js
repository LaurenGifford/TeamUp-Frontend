import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {editUser, editUserTask} from "../redux/userSlice"
import {addToTasks, editTask} from "../redux/tasksSlice"
import {AiOutlineEdit} from "react-icons/ai"
import {Checkbox, Popup, Button, Header} from 'semantic-ui-react'


function Task({task, upcoming, completed}) {
    const [complete, setComplete] = useState(completed)
    const {id, title, description, due_date, status, teammates} = task
    const tmIds = task.teammates.map(tm => tm.id)
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    
    
    function handleVolunteer() {
        addUserTask()
        handleUserPoints(200)
    }

    function handleComplete() {
        setComplete(!complete)
        
        // if (!!complete) {
            handleTaskEdit()
            handleUserPoints(100)
        // }
    }

    function addUserTask() {
        fetch(`http://localhost:3000/ur_tasks`, {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({teammate_id: currentUser.id, task_id: id})
        })
        .then(r => r.json())
        .then(data => {
            console.log(data.task)
            dispatch(editTask(data.task))
        })
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
            dispatch(editUserTask(data))
            dispatch(editTask(data))
        })
    }

    function handleUserPoints(morePoints) {

        fetch(`http://localhost:3000/teammates/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({points: currentUser.points + morePoints})
        })
        .then(r => r.json())
        .then(data => {
            dispatch(editUser(data.points))
        })
    }
    
    function VolunteerButton() {
        if (teammates.length > 2){
            return <Button disabled>Volunteer</Button>
         } 
        else if (tmIds.includes(currentUser.id)) {
            return null
         } 
         else {
             return <Button onClick={handleVolunteer}>Volunteer</Button>
            } 
    }

    return (
        <Popup trigger={
            <li>
                <span> {!complete ?
                    <> 
                    {!!upcoming ? 
                    <Checkbox onChange={handleComplete} 
                    /> : <AiOutlineEdit/>}
                    <strong className={complete ? "completed" : undefined}>  {title} </strong>
                    </> :
                    <strong className={complete ? "completed" : undefined}>  {title} </strong>
                    }
                </span> 
            </li>
            }
            on={['hover', 'click']}
            flowing
            hoverable
            >
            <Header as='h3' content={title} subheader={due_date}></Header>
            <Popup.Content >
                <p>{status}</p>
                <p>{description}</p>
                <VolunteerButton />
            </Popup.Content>
        </Popup>

    )
}


export default Task


{/* {task.teammates ? 
{showTeammates} : 
<p>No teammates for this task</p>} */}