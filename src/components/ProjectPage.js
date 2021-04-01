import {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import {Item, Form, TextArea, Grid, Card, Icon, Header, Modal, Button, Input, Confirm} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux";
import Unassigned from "./Unassigned"
import AddTask from "./AddTask"
import TeamTasks from "./TeamTasks"
import {editProject, deleteProject} from "../redux/ProjectsSlice"
import {deleteUserProject} from "../redux/userSlice"

function ProjectPage({setSingleSelected}) {
    let {projectId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const allProjects = useSelector((state) => state.projects)
    const tasks = useSelector(state => state.tasks)
    const project = allProjects.find(p => p.id === parseInt(projectId))
    const projectTasks = tasks.filter(task => task.project.id === parseInt(projectId))
    const {id, title, notes, priority} = project
    const [showModal, setShowModal] = useState(false)
    const [newNotes, setNewNotes] = useState(notes)
    const [confirmOpen, setConfirmOpen] = useState(false)

    
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

    function handleProjectDelete() {
        console.log("delete?", id)
        dispatch(deleteProject(id))
        dispatch(deleteUserProject(id))

        fetch(`http://localhost:3000/projects/${id}`, {
            method: "DELETE"})
            
        history.push('/projects')
        setSingleSelected(false)
    }

    const handleCancel = () => setConfirmOpen(false)

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
            <div id="project-info" style={{paddingBottom: '60px'}}>
                <Header as='h1'>
                    <Header.Content>
                        {title}
                        <Priority />
                    </Header.Content>
                    <Header.Subheader>
                    {notes}
                        <Modal id='project-notes-modal'
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
                                    <Button color='grey' onClick={(e) => {
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
                    <Button id='complete-project' color="grey" onClick={() => setConfirmOpen(true)}>Complete Project</Button>
                    <Confirm 
                    header='Wait!'
                    content="Are you sure the project is complete and you would like to remove it from your TeamUp?"
                    open={confirmOpen}
                    cancelButton='Never mind'
                    confirmButton="Yes Please"
                    onCancel={handleCancel}
                    onConfirm={handleProjectDelete}
                    size='small'
                />

            </div>
            <Grid>
                <Grid.Column width={3}>
                    <Unassigned projectId={parseInt(projectId)} />
                    <AddTask project={project}/>
                </Grid.Column>
                <Grid.Column width={10} style={{paddingLeft: '60px'}}>
                    <Card.Group >
                        {renderTeamTasks}
                    </Card.Group>
                </Grid.Column>
            </Grid>

        </div>
    )
}

export default ProjectPage