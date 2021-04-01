import {List, Segment, Icon, Transition} from "semantic-ui-react"
import Task from "./Task"
import {useSelector } from "react-redux";



function Upcoming() {
    const currentUser = useSelector(state => state.user)
    const {id, name, points, team_id, tasks} = currentUser

    const renderTasks = tasks.map(task => (
        <Task 
            key={task.id}
            task={task}
            userId = {id}
            points={points}
            upcoming={true} 
            completed={task.completed}
            canAssign={false}
        />
    ))

    return (
        <Transition visible={true} transitionOnMount={true} animation='vertical flip' duration={800}>
            <Segment className='section-background' id='upcoming'>
                <h4><Icon name='tasks'/>CURRENT</h4>
                {tasks &&
                <List items={renderTasks} />
                }
            </Segment>
        </Transition>
    )
}

export default Upcoming