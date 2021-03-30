import {useState, useEffect} from "react"
import {Switch, Route, useRouteMatch} from "react-router-dom";
import {Button, Header, Segment, Grid, Sidebar, Icon, Card, Form, Message, Modal } from "semantic-ui-react"
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
    // const [formData, setFormData] = useState({
    //     title: "",
    //     priority: "",
    //     notes: "",
    //     team_id: parseInt(currentUser.team.id),
    // })
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

    // function handleAddProject(e) {
    //     console.log("triggered")

    //     e.preventDefault()
    //     const formattedData = {
    //         ...formData,
    //         priority: parseInt(formData.priority)
    //     }
    //     fetch(`http://localhost:3000/projects`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type" : 'application/json'
    //         },
    //         body: JSON.stringify(formattedData)
    //     })
    //     .then(r => r.json())
    //     .then(data => dispatch(addToProjects(data)))
    //     setFormData({
    //         title: "",
    //         priority: "",
    //         notes: "",
    //         team_id: parseInt(currentUser.team.id),
    //     })
    // }

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
                                {/* <Header onClick={() => setFormModal(true)}>ADD PROJECT <Icon name='folder'/></Header>
                            {formModal && <AddProj team={currentUser.team} formModal={formModal} setFormModal={setFormModal}/>} */}
                        {/* <Modal
                            as={Form}
                            onClose={() => setFormModal(false)}
                            onOpen={() => setFormModal(true)}
                            open={formModal}
                            trigger={<h3><Icon name='folder'/> ADD PROJECT</h3>}
                            > */}
                                {/* <Modal.Content>
                                    <AddProj onProjectAdd={handleAddProject} team={currentUser.team} />
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={(e) => {
                                        handleAddProject(e)
                                        setFormModal(false)}} type='submit'>Add</Button>
                                    <Button onClick={setFormModal(false)}>Never Mind</Button>
                                </Modal.Actions> */}
                        {/* </Modal> */}
                        {/* <Modal as={Form}
                        trigger={<h3><Icon name='folder'/> ADD PROJECT</h3>}
                        header='ADD PROJECT'
                        content={<AddProj onProjectAdd={handleAddProject} team={currentUser.team} formData={formData} setFormData={setFormData} />}
                        actions={['Never Mind', { key: 'done', content: 'Done', positive: true, type: 'submit', onClick: handleAddProject }]}
                        /> */}
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
                    <ProjectPage />
                </Route>
            </Switch>
            {!singleSelected && <ProjectsList />}
        </div>
    )
}

export default Projects