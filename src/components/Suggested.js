import {Rail, Segment} from "semantic-ui-react"
import {useState} from "react"
import Task from "./Task"

function Suggested({tasks}) {
    const [doIt, setDoIt] = useState({})

    const editedTasks = taskScores(tasks)
    .filter(task => !task.completed)
    .sort((task1, task2) => task2.score - task1.score)

    const suggested = editedTasks[0]
    
    function taskScores(tasks){
        let edited = []
        let i = 0
        while ( i < tasks.length) {
            let thisScore = getDateScore(tasks[i]) + tasks[i].priority
            // debugger
            edited.push({...tasks[i], score: thisScore});
            i++
        }
        return edited
    }
        
        
    function getDateScore(task) {
        let due = new Date(task.due_date)
        let today = new Date()
        let score = due.getMonth() - today.getMonth()
        // score +=  due.getDate() - today.getDate()
        // debugger
        return score
    }


    return (
        // semantic rail
        <div>
            {/* <Rail size='small' internal position='right'> */}
                <Segment raised compact>
                    <h4>Suggested Task</h4>
                    <i>It's coming up and high priority!</i>
                    <Task 
                    task={suggested} 
                    upcoming={false} 
                    completed={suggested.completed}
                    canAssign={false}/>
                </Segment>
            {/* </Rail> */}
        </div>
    )
}

export default Suggested