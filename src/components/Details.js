import {useSelector } from "react-redux";
import {Header, Statistic, Icon} from 'semantic-ui-react'


function Details() {
    const currentUser = useSelector(state => state.user)
    const {name, points, team, tasks} = currentUser
    
    return (
        <aside>
            <Header as='h3' dividing>{name}  |  
                <small> {points}  <Icon name='money' /></small>
            </Header>
            <p>{team.department}</p>
        </aside>
    )
}

export default Details