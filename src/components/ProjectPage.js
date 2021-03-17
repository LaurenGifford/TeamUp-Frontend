import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {Item, Rail, Segment, Grid} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import Unassigned from "./Unassigned"
import AddTask from "./AddTask"
import TeamTasks from "./TeamTasks"

function ProjectPage({projects}) {

    let {projectId} = useParams()
    const allProjects = useSelector((state) => state.projects)
    // const [project, setProject] = useState({})
    // const project = allProjects[projectId]
    const project = allProjects.find(p => p.id === projectId)
    console.log(projectId, project, allProjects)
    
    // debugger
    // const [members, setMembers] = project.team.teammates
    const [tasks, setTasks] = useState([])

    
    useEffect(() => {
        fetch(`http://localhost:3000/tasks`)
        .then(r => r.json())
        .then(data => setTasks(data))
    }, [])

    
    const renderTeamTasks = project.team.teammates.map(member => (
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