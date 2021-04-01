import {Rail, Segment, Icon, Transition} from "semantic-ui-react"
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
            let thisScore = getDateScore(tasks[i]) * tasks[i].priority
            // debugger
            edited.push({...tasks[i], score: thisScore});
            i++
        }
        return edited
    }
        
        
    function getDateScore(task) {
        let today = new Date()
        let due = new Date(task.due_date)
        let moScore = due.getMonth() - today.getMonth()
        let dayScore = (moScore * 30) + (due.getDate() - today.getDate())
        let hourScore = (dayScore * 24) + (due.getHours() - today.getHours())

        return hourScore
    }


    return (
        <Transition visible={true} transitionOnMount={true} animation='vertical flip' duration={800}>
        <div>
            <Segment raised className='section-background'>
                <h4>Suggested Task</h4>
                <i>It's coming up and high priority!</i>
                {suggested ?
                <Task 
                task={suggested} 
                upcoming={false} 
                completed={suggested.completed}
                canAssign={false}/>
                : <p>None to suggest</p>}
            </Segment>
        </div>
        </Transition>
    )
}

export default Suggested