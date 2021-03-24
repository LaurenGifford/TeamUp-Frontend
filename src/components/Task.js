import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {editUser, editUserTask, deleteUserTask} from "../redux/userSlice"
import {addToTasks, editTask} from "../redux/tasksSlice"
import {MdDescription} from "react-icons/md"
import {Checkbox, Popup, Button, Header, Icon, Confirm, Form, Select, Dropdown} from 'semantic-ui-react'


function Task({task, upcoming, completed, canAssign, onDelete, canDelete}) {
    const dispatch = useDispatch()
    const [complete, setComplete] = useState(completed)
    const [showDropdown, setShowDropdown] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [popOpen, setPopOpen] = useState(false)
    const currentUser = useSelector(state => state.user)
    
    const {id, title, description, due_date, due_on, teammates, ur_tasks, project, priority} = task
    const tmIds = task.teammates.map(tm => tm.id)

    let gapi = window.gapi
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
    const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID
    const API_KEY = `${process.env.REACT_APP_API_KEY}`
    const CLIENT_ID = `${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID_TEST}`

    function getColors() {
        let today = new Date()
        let due = new Date(task.due_date)
        let moScore = due.getMonth() - today.getMonth()
        let dayScore = (moScore * 30) + (due.getDate() - today.getDate())
        let hourScore = (dayScore * 24) + (due.getHours() - today.getHours())
        if (!!complete) {
            return 'ForestGreen'
        } else {
            if (hourScore < 24) {
                return 'FireBrick'
            }
            if (hourScore > 24 && hourScore < 48) {
                return 'GoldenRod'
            }
            if (hourScore > 48) {
                return 'DodgerBlue'
            }
    }
    }

    function handleCalendarAdd() {
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
            .then(()=> {
                const event = {
                    'summary' : `${title}`,
                    'description': `${description}`,
                    'start': {
                        'dateTime': `${due_date}`,
                        'timeZone': 'America/New_York'
                    },
                    'end': {
                        'dateTime': `${due_date}`,
                        'timeZone': 'America/New_York'
                    },
                    'recurrence': [
                      'RRULE:FREQ=DAILY;COUNT=2'
                    ],
                    'attendees': [
                    ],
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                      ]
                    }
                }

                const request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                  })

                request.execute(event => {
                console.log(event)
                window.open(event.htmlLink)
                })  

                        // get events
                    // gapi.client.calendar.events.list({
                    //     'calendarId': 'primary',
                    //     'timeMin': (new Date()).toISOString(),
                    //     'showDeleted': false,
                    //     'singleEvents': true,
                    //     'maxResults': 10,
                    //     'orderBy': 'startTime'
                    //   }).then(response => {
                    //     const events = response.result.items
                    //     console.log('EVENTS: ', events)
                    //   })
            })
        })
    }
    
    
    function handleVolunteer() {
        addUserTask(currentUser.id)
        handleUserPoints(200)
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
        dispatch(editTask(data.task))
    })
    }
    
    function handleTaskEdit(status) {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({completed: status})
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
            <Checkbox onChange={() => {
                handleTaskEdit(true)
                handleUserPoints(100)
                setComplete(!complete)
            }} />
            )
        }
        if (complete && upcoming){
            return (
            <Checkbox onChange={() => {
                handleTaskEdit(false)
                handleUserPoints(-100)
                setComplete(!complete)
            }} defaultChecked />
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
            
        return (
            <Form onSubmit={() => addUserTask(selectedUser)}>
                <Dropdown
                    floating
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
            <Dropdown 
            fluid
            floating 
            trigger={<Icon name='ellipsis horizontal'/>}>
                <Dropdown.Menu >
                    {canDelete &&
                    <Dropdown.Item icon='remove' text='Remove from Teammate' onClick={() => onDelete(id)} />
                    }
                    <Dropdown.Item icon='user' text='Assign to new Teammate' 
                    onClick={() => setShowDropdown(!showDropdown)} />
                    <Dropdown.Item icon='hand paper outline' text='Volunteer' onClick={handleVolunteer} 
                    disabled={tmIds.includes(currentUser.id) ? true : false} />
                    <Dropdown.Item text='Add to Calendar' onClick={handleCalendarAdd}/>
                </Dropdown.Menu>
            </Dropdown>
        )
    }


    return (
        <li className='task' style={{backgroundColor: getColors(), color: 'white'}}>
            <Popup trigger={
                <span>
                    <CheckboxOrIcon />
                    <strong className={complete ? "completed" : undefined}> {title} </strong>
                </span> 
            }
                on={['hover', 'click']}
                eventsEnabled={true}
                onClose={() => setPopOpen(false)}
                onOpen={() => setPopOpen(true)}
                open={popOpen}
                flowing
                hoverable
                mouseEnterDelay={300}
                mouseLeaveDelay={600}
                offset={[0, 10]}
                wide
                size='large'
                position='right center'
            >
                <Header as='h3' content={title} 
                    subheader={!complete ? <Icon name='warning circle'/>: <Icon name='check circle' />}>
                </Header>
                <Popup.Content >
                    <h4>{due_on}</h4>
                    <p>Project: {project.title} </p>
                    <p>{description}</p>
                    {canAssign && <TaskOptionsDropdown />}
                    {showDropdown && <AssignmentDropdown />}
                </Popup.Content>
            </Popup>
            {upcoming &&
            <span >
            <Icon name='delete' onClick={() => setConfirmOpen(true)}/>
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
