import {useState, useEffect} from "react"
import {Item, Rail, Segment, Grid, Card, Header, Message} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import Details from "./Details"
import Upcoming from "./Upcoming"
import Suggested from "./Suggested"
import ProjTasks from "./ProjTasks"

function Dashboard({setSingleSelected}) {
    const currentUser = useSelector(state => state.user)
    const [messageVis, setMessageVis] = useState(true)
    const {name, points, team_id, tasks, projects} = currentUser

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
        <Grid style={{padding: '60px'}}>
            <Grid.Row>
                <Grid.Column >
                    <Details currentUser={currentUser} />
                    {messageVis &&
                    <Message compact floating info
                    onDismiss={() => setMessageVis(false)}
                    header='Curious about the project colors?'
                    content='Red = Priority 9-10, Orange = Priority 7-8, Yellow = Priority 4-6, Blue = Priority 1-3'
                    /> }
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3} >
                    {tasks.length !== 0 ? <>
                    <Upcoming currentUser={currentUser}/> 
                    <Suggested tasks={tasks}/>
                     </> : 
                    <p>No Tasks to Show!</p> }
                </Grid.Column>
                <Grid.Column width={10} style={{paddingLeft: '60px'}}>
                    <Segment>
                    <Header as='h2'>MY PROJECTS </Header>
                    <p><i>These are the projects you are currently assigned to.</i></p>
                    <Card.Group id='project-cards'>
                        {tasks.length !== 0 ? 
                        renderProjects  : 
                        <p>Go to the projects page to see all of your team's projects and volunteer for tasks!</p> }
                    </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Dashboard