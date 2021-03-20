import {useState, useEffect} from "react"
import {Item, Rail, Segment, Grid, Card} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import Details from "./Details"
import Upcoming from "./Upcoming"
import Suggested from "./Suggested"
import ProjTasks from "./ProjTasks"

function Dashboard({setSingleSelected}) {
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
            setSingleSelected={setSingleSelected}
        />
    ))


    return (
        <Grid celled='internally'>
            <Grid.Row>
                <Grid.Column width={11} >
                    <Details currentUser={currentUser} />
                </Grid.Column>
                {/* <Grid.Column width={5} /> */}
                <Grid.Column width={5}>
                    <Suggested tasks={tasks}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Upcoming currentUser={currentUser}/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <h2>My Projects</h2>
                    <i>These are projects you are currently assigned to.</i>
                    <Card.Group >
                        {renderProjects}
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Dashboard