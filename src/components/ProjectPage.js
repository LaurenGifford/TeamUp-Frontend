import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {Item, Rail, Segment, Grid} from "semantic-ui-react"
import Unassigned from "./Unassigned"
import AddTask from "./AddTask"
import TeamTasks from "./TeamTasks"

function ProjectPage({project}) {
    const [members, setMembers] = project.team.teammates
    const [tasks, setTasks] = useState([])
    debugger
    // let {projectId} = useParams()
    // const project = projects[projectId]
    // console.log(projectId)

    useEffect(() => {
        fetch(`http://localhost:3000/tasks`)
        .then(r => r.json())
        .then(data => setTasks(data))
    }, [])

    const renderTeamTasks = members.map(member => (
        <TeamTasks
            key={member.id}
            member={member} 
            tasks={tasks}
        />
        ))

        function handleAddTask(task) {
            console.log(task)
        }

    return (
        <div id="project-page">Here some project information
        {project}
            <Unassigned tasks={tasks}/>
            {renderTeamTasks}
            <AddTask project={project} onTaskAdd={handleAddTask} />
        
        
        </div>
    )
}

export default ProjectPage