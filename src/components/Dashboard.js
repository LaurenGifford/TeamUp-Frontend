import {useState, useEffect} from "react"
import {Item, Rail, Segment, Grid, Card} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import Details from "./Details"
import Upcoming from "./Upcoming"
import Suggested from "./Suggested"
import ProjTasks from "./ProjTasks"

function Dashboard() {
    const currentUser = useSelector(state => state.user)
    const {name, points, team_id, tasks, projects} = currentUser


    // const setProjects = [...new Set(projects.map(proj => proj.id))]
    // .map(id => projects.find(proj => proj.id === id))


    const renderProjects = projects.map(project => (
        <ProjTasks 
            key={project.id}
            project={project}
            home={true}
            tasks={tasks}
        />
    ))


    return (
        <Grid celled='internally'>
            <Grid.Row>
                <Grid.Column width={3} >
                    <Details currentUser={currentUser} />
                </Grid.Column>
                <Grid.Column width={15}>
                    {tasks ? 
                    <Suggested tasks={tasks}/> : 
                    <p>No Tasks to Show!</p> }
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3}>
                    {tasks ? 
                    <Upcoming currentUser={currentUser}/>  : 
                    <p>No Tasks to Show!</p> }
                </Grid.Column>
                <Grid.Column width={10}>
                    <h2>Projects</h2>
                    <Card.Group >
                        {tasks ? 
                        {renderProjects}  : 
                        <p>Go to the projects page to see your team's projects!</p> }
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Dashboard