import {useState, useEffect} from "react"
import {Item, Rail, Segment, Grid} from "semantic-ui-react"
import Details from "./Details"
import Upcoming from "./Upcoming"
import Suggested from "./Suggested"
import ProjTasks from "./ProjTasks"

function Dashboard({currentUser, myProjects}) {
    const {name, points, team_id, tasks} = currentUser


    const renderProjects = myProjects.map(project => (
        <ProjTasks 
            key={project.id}
            project={project}
        />
    ))

    return (
        <>I'm a Dashboard
            <Details currentUser={currentUser} />
            <Upcoming currentUser={currentUser}/>
            <Item.Group >Projects Here
                {renderProjects}
            </Item.Group>
            <Suggested />
        </>
    )
}

export default Dashboard