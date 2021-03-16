import {Rail, Segment} from "semantic-ui-react"
import {useState} from "react"
import Task from "./Task"

function Suggested({tasks}) {
    const [doIt, setdoIt] = useState({})

// function getSuggestion() {
//     const priorities = tasks.forEach(task => {
//         console.log(task.project.priority)
//         return task.project.priority(task.due_date) / task.users
//     })
//     console.log(priorities)
// }

    return (
        // semantic rail
        <div>
            <Rail size='large' internal position='right'>
                <Segment >Suggested 
                    <Task task={doIt}/>
                </Segment>
            </Rail>
        </div>
    )
}

export default Suggested