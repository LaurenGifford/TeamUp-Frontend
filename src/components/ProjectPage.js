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

    
    const renderTeamTasks = project.team.teammates.map(member => (
        <TeamTasks
            key={member.id}
            member={member} 
            tasks={projectTasks}
            project={project}
        />
        ))

    return (
        <div id="project-page" style={{padding: '60px'}}>
            <h1 style={{paddingBottom: '60px'}}>{project.title}</h1>
            <Grid >
                <Grid.Row >
                    <Grid.Column width={3}>
                        <Unassigned projectId={parseInt(projectId)} />
                    </Grid.Column>
                    <Grid.Column width={8} style={{paddingLeft: '60px'}}>
                        <h2>TEAM</h2>
                        <Card.Group centered>
                            {renderTeamTasks}
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                        <AddTask project={project}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}

export default ProjectPage