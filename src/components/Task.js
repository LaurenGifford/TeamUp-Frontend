import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {editUser, editUserTask, deleteUserTask} from "../redux/userSlice"
import {addToTasks, editTask} from "../redux/tasksSlice"
import {MdDescription} from "react-icons/md"
import {Checkbox, Popup, Button, Header, Icon, Confirm} from 'semantic-ui-react'


function Task({task, upcoming, completed}) {
    const [complete, setComplete] = useState(completed)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const {id, title, description, due_date, teammates, ur_tasks} = task
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
            body: JSON.stringify({completed: true})
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

    function handleDelete() {
        setConfirmOpen(false)
        const urTask = ur_tasks.find(ur => ur.task_id === id)
        console.log(urTask)
        fetch(`http://localhost:3000/ur_tasks/${urTask.id}`, {
            method: "DELETE"
        })
        dispatch(deleteUserTask(urTask.task_id))
    }

    const handleCancel = () => setConfirmOpen(false)
    
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

    function CheckboxOrIcon() {
        if (!complete && upcoming) {
            return (
                <Checkbox onChange={handleComplete} />
                )
        }
        if (complete && upcoming){
            return (
                <Checkbox onChange={handleComplete} defaultChecked />
            )
        }
        if (!upcoming) {
            return (
                <MdDescription/>
            )
        }
    }

    return (
        <li>
            <Popup trigger={
                <span>
                    <CheckboxOrIcon />
                    <strong className={complete ? "completed" : undefined}> {title} </strong>
                </span> 
            }
                on={['hover', 'click']}
                flowing
                hoverable
                mouseEnterDelay={300}
                offset={[0, 50]}
                position='right center'
            >
                <Header as='h3' content={title} subheader={due_date}></Header>
                <Popup.Content >
                    <p>{completed}</p>
                    <p>{description}</p>
                    <VolunteerButton />
                </Popup.Content>
            </Popup>
            {upcoming &&
            <span >
            <Button icon onClick={() => setConfirmOpen(true)} size='mini'>
                <Icon name='delete' />
            </Button>
            <Confirm 
                header='Wait!'
                content='Are you sure you want to delete this task from your current tasks?'
                open={confirmOpen}
                cancelButton='Never mind'
                confirmButton="Yes Please"
                onCancel={handleCancel}
                onConfirm={handleDelete}
                size='small'
            />
            </span>
            }
        </li>

    )
}


export default Task


{/* {task.teammates ? 
{showTeammates} : 
<p>No teammates for this task</p>} */}