import {List, Segment, Icon} from "semantic-ui-react"
import { useSelector } from "react-redux";
import Task from "./Task"

function Unassigned({projectId}) {
    const tasks = useSelector(state => state.tasks)
    const currentUser = useSelector(state => state.user)
    const projectTasks = tasks.filter(task => task.project.id === projectId)

    const renderTasks = projectTasks.filter(task => {
        const tmIds = task.teammates.map(tm => tm.id)
        if (task.teammates.length === 0){
            return task
        }
        else if (tmIds.includes(currentUser.id)) {
            return null
         }
        else { return null}
        })
        .map(task => (
        <Task 
            key={task.id}
            task={task}
            upcoming={false}
            canAssign={true}
            completed={task.completed}
        />
    ))


    return (
        <Segment>
             <h4><Icon name='tasks'/>UNASSIGNED</h4>
            <List items={renderTasks} />
        </Segment>
    )
}

export default Unassigned