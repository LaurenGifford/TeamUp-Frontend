import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {Item, Rail, Segment, Grid, Card} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import Unassigned from "./Unassigned"
import AddTask from "./AddTask"
import TeamTasks from "./TeamTasks"

function ProjectPage() {

    let {projectId} = useParams()
    const allProjects = useSelector((state) => state.projects)
    const tasks = useSelector(state => state.tasks)
    const project = allProjects.find(p => p.id === parseInt(projectId))
    const projectTasks = tasks.filter(task => task.project.id === parseInt(projectId))
    // console.log(tasks)

    
    const renderTeamTasks = project.team.teammates.map(member => (
        <TeamTasks
            key={member.id}
            member={member} 
            tasks={projectTasks}
        />
        ))

        function handleAddTask(task) {
            console.log(task)
        }

    return (
        <div id="project-page">
            <h1>{project.title}</h1>
            <Grid celled>
                <Grid.Row >
                    <Grid.Column width={4}>
                        <Unassigned projectId={parseInt(projectId)} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h2>Team</h2>
                        <Card.Group>
                            {renderTeamTasks}
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <AddTask project={project} onTaskAdd={handleAddTask} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}

export default ProjectPage