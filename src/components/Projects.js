import {useState, useEffect} from "react"
import {Switch, Route, useRouteMatch} from "react-router-dom";
import {Button, Header, Segment, Grid, Sidebar, Icon, Card, Form, Message, Transition } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import {addToProjects, showProjects} from "../redux/ProjectsSlice"
import ProjTasks from "./ProjTasks"
import AddProj from "./AddProj"
import ProjectPage from "./ProjectPage"

function Projects({singleSelected, setSingleSelected}) {
    const allProjects = useSelector((state) => state.projects)
    const currentUser = useSelector(state => state.user)
    const [formVisible, setFormVisible] = useState(false)
    const [messageVis, setMessageVis] = useState(true)
    const [formModal, setFormModal]  = useState(false)
    const match = useRouteMatch()
    const dispatch = useDispatch();

    const renderProjects = allProjects.filter(proj => proj.team.id === currentUser.team.id)
    .map(project => (
        <ProjTasks 
            key={project.id}
            project={project}
            home={false}
            setSingleSelected={setSingleSelected}
        />
    ))

    function ProjectsList() {
        return (
            <div id='all-projects'>
                <Grid style={{padding: '60px'}}>
                <Grid.Row >
                    <Grid.Column width={10} style={{paddingBottom: '20px'}}>
                    <h2 >TEAM PROJECTS</h2>
                    <i>All Projects currently assigned to your team.</i>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered >
                    <Grid.Column width={10}>
                    <Card.Group id='project-cards'>
                            {renderProjects}
                    </Card.Group>
                    {messageVis &&
                        <Message 
                        compact
                        floating info
                        onDismiss={() => setMessageVis(false)}
                        header='Curious about the project colors?'
                        content='Red = Priority 9-10, Orange = Priority 7-8, Yellow = Priority 4-6, Blue = Priority 1-3'
                        />}
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                    <AddProj team={currentUser.team} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        )
    }

    return (

        <div id="projects-page">
            <Switch>
                <Route path={`${match.url}/:projectId`}>
                    <ProjectPage setSingleSelected={setSingleSelected}/>
                </Route>
            </Switch>
            {!singleSelected && <ProjectsList />}
        </div>
    )
}

export default Projects