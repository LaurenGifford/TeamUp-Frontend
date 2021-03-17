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

    function getStatusScore() {
        let statusScores = tasks.forEach(task => {
            let score
            if (task.status === "not started") {
                return score += 10
            }
            if (task.status === "in progress") {
                return score += 4
            }
            if (task.status === "stuck") {
                return score += 7
            }
            else {score += 0}
            debugger
            return score
        })
        return statusScores
    }

    getStatusScore()

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