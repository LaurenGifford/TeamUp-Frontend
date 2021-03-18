import {Rail, Segment} from "semantic-ui-react"
import {useState} from "react"
import Task from "./Task"

function Suggested({tasks}) {
    const [doIt, setDoIt] = useState({})

    const editedTasks = taskScores(tasks).sort((task1, task2) => task2.score - task1.score)
    const suggested = editedTasks[0]
    // setDoIt(suggested[0])
    console.log(suggested)
    
    function taskScores(tasks){
        let edited = []
        let i = 0
        while ( i < tasks.length) {
            let thisScore = getStatusScore(tasks[i]) * (tasks[i].priority * tasks[i].teammates.length)
            // console.log(tasks[i], thisScore);
            getDateScore(tasks[i]);
            // debugger
            edited.push({...tasks[i], score: thisScore});
            i++
        }
        return edited
    }
        
        // console.log(taskScores(tasks))
        
    function getStatusScore(task) {
        let score = 0
        if (task.status === "not started") {
            return score += 10
        }
        if (task.status === "in progress") {
            return score += 4
        }
        if (task.status === "stuck") {
            return score += 7
        }
        else {score = 0}
        // debugger
        return score
    }
        
    function getDateScore(task) {
        console.log(task.due_date)
        // debugger
        // convert dueDate new Date().toUTCString()
    }


    return (
        // semantic rail
        <div>
            <Rail size='large' internal position='right'>
                <Segment >
                    <h4>Suggested Task</h4>
                    <Task task={suggested} upcoming={false} />
                </Segment>
            </Rail>
        </div>
    )
}

export default Suggested