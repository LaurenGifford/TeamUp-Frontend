import {useState, useEffect} from "react"
import {Item, Rail, Segment, Grid} from "semantic-ui-react"
import Details from "./Details"
import Upcoming from "./Upcoming"
import Suggested from "./Suggested"
import ProjTasks from "./ProjTasks"

function Dashboard({currentUser, myProjects}) {
    const {name, points, team_id, tasks} = currentUser


    const renderProjects = myProjects.map(project => (
        <ProjTasks 
            key={project.id}
            project={project}
        />
    ))

    return (
        <Grid celled='internally'>
            <Grid.Row>
                <Grid.Column width={3} >
                    <Details currentUser={currentUser} />
                </Grid.Column>
                <Grid.Column width={15}>
                    <Suggested tasks={currentUser.tasks}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Upcoming currentUser={currentUser}/>
                </Grid.Column>
                <Grid.Column>
                    <Item.Group width={10}>
                        <h2>Projects</h2>
                        {renderProjects}
                    </Item.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Dashboard