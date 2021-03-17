import {useState, useEffect} from "react"
import {Switch, Route, useRouteMatch} from "react-router-dom";
import {Item, Rail, Segment, Grid} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import {addToProjects, showProjects} from "../redux/ProjectsSlice"
import ProjTasks from "./ProjTasks"
import AddProj from "./AddProj"
import ProjectPage from "./ProjectPage"

function Projects({currentUser}) {
    const allProjects = useSelector((state) => state.projects)
    const match = useRouteMatch()
    const dispatch = useDispatch();

    const renderProjects = allProjects.map(project => (
        <ProjTasks 
            key={project.id}
            project={project}
            home={false}
            currentUser={currentUser}
        />
    ))

    function handleAddProject(project) {
        dispatch(addToProjects(project))
    }
    console.log(allProjects)

    return (
        <>
            <Switch>
            <Route path={`${match.url}/:projectId`}>
                <ProjectPage />
            </Route>
            </Switch>
        <div id="projects-page">
            <Grid columns={2} divided divided="vertically">
                <Grid.Row>
                    <Grid.Column width={10}>
                    <h2>Team Projects</h2>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Item.Group width={10}>
                            {renderProjects}
                        </Item.Group>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <AddProj onProjectAdd={handleAddProject} team={currentUser.team} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        </>
    )
}

export default Projects