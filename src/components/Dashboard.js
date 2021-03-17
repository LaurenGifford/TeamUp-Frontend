import {useState, useEffect} from "react"
import {Item, Rail, Segment, Grid, Card} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import Details from "./Details"
import Upcoming from "./Upcoming"
import Suggested from "./Suggested"
import ProjTasks from "./ProjTasks"

function Dashboard({currentUser}) {
    const {name, points, team_id, tasks, projects} = currentUser

    const renderProjects = projects.map(project => (
        <ProjTasks 
            key={project.id}
            project={project}
            home={true}
            currentUser={currentUser}
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
                    <Suggested tasks={tasks}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Upcoming currentUser={currentUser}/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <h2>Projects</h2>
                    <Card.Group >
                        {renderProjects}
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Dashboard