import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {Item, Form, TextArea, Grid, Card, Icon, Header, Modal, Button, Input} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import Unassigned from "./Unassigned"
import AddTask from "./AddTask"
import TeamTasks from "./TeamTasks"
import {editProject} from "../redux/ProjectsSlice"

function ProjectPage() {
    let {projectId} = useParams()
    const dispatch = useDispatch()
    const allProjects = useSelector((state) => state.projects)
    const tasks = useSelector(state => state.tasks)
    const project = allProjects.find(p => p.id === parseInt(projectId))
    const projectTasks = tasks.filter(task => task.project.id === parseInt(projectId))
    const {id, title, notes, priority} = project
    const [showModal, setShowModal] = useState(false)
    const [newNotes, setNewNotes] = useState(notes)

    
    const renderTeamTasks = project.team.teammates.map(member => (
        <TeamTasks
            key={member.id}
            member={member} 
            tasks={projectTasks}
            project={project}
        />
        ))


    function handleEditProject(e) {
        e.preventDefault()

        fetch(`http://localhost:3000/projects/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({notes: newNotes})
        })
        .then(r => r.json())
        .then(data => dispatch(editProject(data)))
    }

    function Priority() {
            if (priority >= 7){
                return (<><Icon name='exclamation' /><Icon name='exclamation' /><Icon name='exclamation' /></>)}
            if (priority > 3 && priority < 7) {
                return (<><Icon name='exclamation' /><Icon name='exclamation' /></>)}
            if (priority > 0 && priority <= 3){
                return (<><Icon name='exclamation' /></>)}

    }

    return (
        <div id="project-page" style={{padding: '60px'}}>
            <div id="project-info">
                <Header as='h1' style={{paddingBottom: '60px'}}>
                    <Header.Content>
                        {title}
                        <Priority />
                    </Header.Content>
                    <Header.Subheader>
                    {notes}
                        <Modal
                            as={Form}
                            onClose={() => setShowModal(false)}
                            onOpen={() => setShowModal(true)}
                            open={showModal}
                            size='small'
                            trigger={<Icon name='pencil alternate' style={{cursor: 'pointer'}}/>}
                            >
                                <Header>Edit Project Notes</Header>
                                <Modal.Content>
                                    <TextArea
                                    name="notes"
                                    onChange={(e) => setNewNotes(e.target.value)} 
                                    value={newNotes} />
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button onClick={(e) => {
                                        setShowModal(false);
                                        handleEditProject(e)
                                    }}
                                    type="submit"
                                        >
                                        Save Notes
                                    </Button>
                                </Modal.Actions>
                        </Modal>
                    </Header.Subheader>
                </Header>

            </div>
            <Grid>
                <Grid.Column width={3}>
                    <Unassigned projectId={parseInt(projectId)} />
                    <AddTask project={project}/>
                </Grid.Column>
                <Grid.Column width={12} style={{paddingLeft: '60px'}}>
                    {/* <h2 style={{textAlign: 'center'}}>TEAM</h2> */}
                    <Card.Group >
                        {renderTeamTasks}
                    </Card.Group>
                </Grid.Column>
            </Grid>

        </div>
    )
}

export default ProjectPage