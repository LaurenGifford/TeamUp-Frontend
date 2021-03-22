import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {editUser, editUserTask, deleteUserTask} from "../redux/userSlice"
import {addToTasks, editTask} from "../redux/tasksSlice"
import {MdDescription} from "react-icons/md"
import {Checkbox, Popup, Button, Header, Icon, Confirm, Form, Select, Dropdown} from 'semantic-ui-react'


function Task({task, upcoming, completed, canAssign, onDelete}) {
    const dispatch = useDispatch()
    const [complete, setComplete] = useState(completed)
    const [showDropdown, setShowDropdown] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const currentUser = useSelector(state => state.user)
    
    const {id, title, description, due_date, teammates, ur_tasks} = task
    const tmIds = task.teammates.map(tm => tm.id)
    
    
    
    function handleVolunteer() {
        addUserTask(currentUser.id)
        handleUserPoints(200)
    }
    
    function handleComplete() {
        setComplete(!complete)
        const pointsAmount = complete ? 100 : -100
        
        // if (!!complete) {
            handleTaskEdit()
            handleUserPoints(pointsAmount)
            // }
    }
        
        function addUserTask(teammate_id) {
            fetch(`http://localhost:3000/ur_tasks`, {
                method: "POST",
                headers: {
                    "Content-Type" : 'application/json'
                },
                body: JSON.stringify({teammate_id: teammate_id, task_id: id})
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
            body: JSON.stringify({completed: complete})
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
    
    function handleMyDelete() {
        setConfirmOpen(false)
        const urTask = ur_tasks.find(ur => ur.task_id === id)
        fetch(`http://localhost:3000/ur_tasks/${urTask.id}`, {
            method: "DELETE"
        })
        dispatch(deleteUserTask(urTask.task_id))
    }
    
    const handleCancel = () => setConfirmOpen(false)


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

                
    function AssignmentDropdown() {
        const [selectedUser, setSelectedUser] = useState('')
        const teammateOptions = currentUser.team.teammates.map(tm =>({
            value: tm.id, key: tm.id, text: tm.name})
            )
            
            // function handleSelectChange(e, data) {
            //     setSelectedUser(data.value)
            // }

        return (
            <Form onSubmit={() => addUserTask(selectedUser)}>
                <Dropdown
                    selection
                    fluid
                    placeholder="Select Teammate to assign"
                    value={selectedUser}
                    options={teammateOptions}
                    onChange={(e, data) => setSelectedUser(data.value)}>
                </Dropdown>
                    <Form.Button>Assign Task</Form.Button>
            </Form>
       )
    }

    function TaskOptionsDropdown() {

        return (
            <Dropdown trigger={<Icon name='ellipsis horizontal'/>}>
                <Dropdown.Menu >
                    <Dropdown.Item text='Remove from teammate' onClick={() => onDelete(id)} />
                    {canAssign &&
                    <Dropdown.Item text='Assign to new Teammate' 
                    onClick={() => setShowDropdown(!showDropdown)} />
                    }
                    <Dropdown.Item text='Volunteer' onClick={handleVolunteer} 
                    disabled={tmIds.includes(currentUser.id) ? true : false} />
                </Dropdown.Menu>
            </Dropdown>
        )
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
                <Header as='h3' content={title} subheader={!complete && <Icon name='exclamation'/>}>
                </Header>
                <Popup.Content >
                    {due_date}
                    <p>{complete}</p>
                    <p>{description}</p>
                    <TaskOptionsDropdown />
                    {showDropdown && <AssignmentDropdown />}
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
                onConfirm={handleMyDelete}
                size='small'
            />
            </span>
            }
        </li>

    )
}


export default Task
