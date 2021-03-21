import {Rail, Segment} from "semantic-ui-react"
import {useState} from "react"
import Task from "./Task"

function Suggested({tasks}) {
    const [doIt, setDoIt] = useState({})

    const editedTasks = taskScores(tasks)
    .filter(task => !task.completed)
    .sort((task1, task2) => task2.score - task1.score)

    const suggested = editedTasks[0]
    // setDoIt(suggested[0])
    // console.log(suggested)
    
    function taskScores(tasks){
        let edited = []
        let i = 0
        while ( i < tasks.length) {
            let thisScore = getDateScore(tasks[i]) * tasks[i].priority
            // debugger
            edited.push({...tasks[i], score: thisScore});
            i++
        }
        return edited
    }
        
        // console.log(taskScores(tasks))
        
    // function getStatusScore(task) {
    //     let score = 0
    //     if (task.completed) {
    //         return score += 0
    //     }
    //     if (!task.completed) {
    //         return score += 10
    //     }
    //     return score
    // }
        
    function getDateScore(task) {
        console.log(task.due_date, new Date().toUTCString())
        // debugger
        // convert dueDate new Date().toUTCString()
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
                    completed={suggested.completed}/>
                </Segment>
            {/* </Rail> */}
        </div>
    )
}

export default Suggested