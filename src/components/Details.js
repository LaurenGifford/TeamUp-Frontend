import {useSelector } from "react-redux";
import {Header, Statistic} from 'semantic-ui-react'


function Details() {
    const currentUser = useSelector(state => state.user)
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