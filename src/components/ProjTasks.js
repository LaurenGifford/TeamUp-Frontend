import {Item} from 'semantic-ui-react'
import {useHistory, Link} from 'react-router-dom'

function ProjTasks({project}) {
    const {title, notes, priority} = project
    let projectId = project.id
    const history = useHistory()

    function handleProjectClick() {
        history.push(`/projects/${projectId}`)
    }

    return (
        <Item>
            <Item.Content onClick={handleProjectClick}>
                <Item.Header >{title}</Item.Header>
                {/* <Link to={`/projects/${id}`}>See Project</Link> */}
                <Item.Meta>{priority} </Item.Meta>
                <Item.Description>Notes: {notes} </Item.Description>
            </Item.Content>
        </Item>
    )
}

export default ProjTasks