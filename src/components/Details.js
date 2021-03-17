import {Header} from 'semantic-ui-react'


function Details({currentUser}) {
    const {name, points, team, tasks} = currentUser
    
    return (
        <aside>
            <Header as='h3' dividing>{name} | 
                <small>{points}</small>
            </Header>
            <p>{team.department}</p>
        </aside>
    )
}

export default Details