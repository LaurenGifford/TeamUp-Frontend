import {useState, useEffect} from "react"
import {Switch, Route, useRouteMatch} from "react-router-dom";
import {Item, Rail, Segment, Grid, Sidebar, Icon } from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import {addToProjects, showProjects} from "../redux/ProjectsSlice"
import ProjTasks from "./ProjTasks"
import AddProj from "./AddProj"
import ProjectPage from "./ProjectPage"

function Projects({singleSelected, setSingleSelected}) {
    const allProjects = useSelector((state) => state.projects)
    const currentUser = useSelector(state => state.user)
    const [formVisible, setFormVisible] = useState(false)
    // const [singleSelected, setSingleSelected] = useState(false)
    const match = useRouteMatch()
    const dispatch = useDispatch();

    const renderProjects = allProjects.map(project => (
        <ProjTasks 
            key={project.id}
            project={project}
            home={false}
            setSingleSelected={setSingleSelected}
        />
    ))

    function handleAddProject(project) {
        dispatch(addToProjects(project))
    }

    function ProjectsList() {
        return (
            <Grid columns={2} relaxed='very' divided divided="vertically" padded>
            <Grid.Row>
                <Grid.Column width={10}>
                <h2>Team Projects</h2>
                <i>All Projects currently assigned to your team.</i>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={10}>
                    <Item.Group >
                        {renderProjects}
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={6}>
{/* 
                    <Sidebar 
                        as={Segment}
                        vertical
                        animation='overlay'
                        direction='right'
                        visible={formVisible}
                        inverted
                    > */}
                    <AddProj onProjectAdd={handleAddProject} team={currentUser.team} />
                    {/* </Sidebar>
                    <Sidebar.Pusher dimmed={formVisible}>
                        <h3 onClick={() => setFormVisible(!formVisible)} >
                            ADD PROJECT <Icon name='arrow alternate circle left'/>
                        </h3>
                    </Sidebar.Pusher> */}

                </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }

    return (

        <div id="projects-page">
            <Switch>
                <Route path={`${match.url}/:projectId`}>
                    <ProjectPage />
                </Route>
            </Switch>
            {!singleSelected && <ProjectsList />}
        </div>
    )
}

export default Projects