import {useState, useEffect} from "react"
import {useRouteMatch, useParams } from "react-router-dom";
import {Item, Rail, Segment, Grid} from "semantic-ui-react"
import ProjTasks from "./ProjTasks"
import AddProj from "./AddProj"

function Projects({team}) {
    const [allProjects, setAllProjects] = useState([])

    const match = useRouteMatch()
    let params = useParams()
    console.log(params, match)

    useEffect(() => {
        fetch(`http://localhost:3000/projects`)
        .then(r => r.json())
        .then(data => setAllProjects(data))
    }, [])

    const renderProjects = allProjects.map(project => (
        <ProjTasks 
            key={project.id}
            project={project}
        />
    ))

    function handleAddProject(project) {
        console.log(project)
        setAllProjects([...allProjects, project])
    }

    return (
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
                        <AddProj onProjectAdd={handleAddProject} team={team} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Projects