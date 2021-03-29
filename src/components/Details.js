import {useSelector } from "react-redux";
import {Header, Statistic, Icon} from 'semantic-ui-react'


function Details() {
    const currentUser = useSelector(state => state.user)
    const {name, points, team, tasks} = currentUser
    
    return (
        <aside>
            <Header as='h1' >{name}  |  
                <small > {points}  <Icon id='points' name='money' /></small>
                <Header sub >{team.department} Department</Header>
            </Header>
        </aside>
    )
}

export default Details