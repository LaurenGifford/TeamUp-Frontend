import {Item} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function ProjTasks({project}) {
    const {title, notes, priority} = project
    let projectId = project.id


    return (
        <Item>
            <Item.Content >
                <Item.Header >
                <Link to={`/projects/${projectId}`}>{title}</Link>
                </Item.Header>
                <Item.Meta>{priority} </Item.Meta>
                <Item.Description>Notes: {notes} </Item.Description>
            </Item.Content>
        </Item>
    )
}

export default ProjTasks