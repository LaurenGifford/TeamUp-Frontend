import {useState} from "react"
import {Item, Card, Icon, Transition} from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import Task from "./Task"

function ProjTasks({project, home, setSingleSelected}) {
    const [isHome, setIsHome]  = useState(home)
    const currentUser = useSelector(state => state.user)
    const allTasks = useSelector(state => state.tasks)
    const {tasks} = currentUser
    // const tasks = allTasks
    const {id, title, notes, priority} = project
    let projectId = id

    const colors = {
        1 : 'blue',
        2 : 'blue',
        3 : 'blue',
        4 : 'yellow',
        5 : 'yellow',
        6 : 'yellow',
        7 : 'orange',
        8 : 'orange',
        9 : 'red',
        10 : 'red',
    }


    function Tasks() {
        const toRender = tasks.filter(task => task.project.id === id)
        if (toRender.length > 0) {
            return (toRender.map(task => (
                <Task 
                    key={task.id}
                    task={task}
                    upcoming={false}
                    completed={task.completed}
                    canAssign={false}
                />
            ))
            )
        }
        else {return null}
    }

    // color={colors[priority]}
    return (
        <Transition visible={true} transitionOnMount={true} animation='vertical flip' duration={800}>
        <Card id={`${colors[priority]}`}  >
            <Card.Content >
                <Card.Header >
                <Link 
                    to={`/projects/${projectId}`} 
                    onClick={() => setSingleSelected(true)} >
                    {title}
                </Link>
                </Card.Header>
                <Card.Meta>Priority {priority} </Card.Meta>
                <Card.Description>
                    <strong>{!!isHome ? <Icon name='tasks'/> : null} </strong>
                    {!!isHome ? <Tasks /> : notes}
                </Card.Description>
            </Card.Content>
        </Card>
        </Transition>
    )
}

export default ProjTasks

