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
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3} id='listed-tasks'>
                    {tasks.length !== 0 ? <>
                    <Upcoming id='upcoming' currentUser={currentUser}/> 
                    <Suggested id='suggested' tasks={tasks}/>
                     </> : 
                    <strong>No Tasks to Show!</strong> }
                </Grid.Column>
                <Grid.Column  width={10} style={{paddingLeft: '60px'}}>
                    <Segment className='section-background'>
                    <Header as='h2'>MY PROJECTS </Header>
                    <p><i>These are the projects you are currently assigned to.</i></p>
                    <Card.Group id='project-cards'>
                        {tasks.length !== 0 ? 
                        renderProjects  : 
                        <p>Go to the projects page to see all of your team's projects and volunteer for tasks!</p> }
                    </Card.Group>

                    </Segment>
                    {messageVis &&
                    <Message compact floating info
                    onDismiss={() => setMessageVis(false)}
                    header='Curious about the task colors? Monitor nearness to task due date!'
                    content='Red = 24hrs, Yellow = 24-48hrs, Blue = more than 48hrs, Green = complete!'
                    /> }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Dashboard