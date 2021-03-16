import {Item} from 'semantic-ui-react'

function ProjTasks({project}) {
    return (
        <Item>
            <Item.Content>
                <Item.Header>Title</Item.Header>
                <Item.Meta>Priority</Item.Meta>
                <Item.Description>Notes</Item.Description>
            </Item.Content>
        </Item>
    )
}

export default ProjTasks