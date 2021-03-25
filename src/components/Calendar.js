import { render } from 'react-dom'
import { useDispatch, useSelector } from "react-redux";
import {Button} from 'semantic-ui-react'
import moment from 'moment'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { GoogleLogin } from "react-google-login";
import { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import request from "superagent";
import ApiCalendar from 'react-google-calendar-api/src/ApiCalendar';


function MyCalendar() {
    const localizer = momentLocalizer(moment)
    const currentUser = useSelector(state => state.user)
    const [events, setEvents] = useState([])

    useEffect(() => {
        googleLogin()
    }, [])


    function googleLogin() {
        ApiCalendar.initClient()
        ApiCalendar.handleAuthClick()

        ApiCalendar.setCalendar('primary')

        if (ApiCalendar.sign)
        ApiCalendar.listUpcomingEvents(10).then(({ result }: any) => {
            console.log(result.items);
            const events = [];
            result.items.map(event => {
                return events.push({
                start: new Date(event.start.dateTime.toString()),
                end: new Date(event.end.dateTime.toString()),
                title: event.summary
                });
            });
            setEvents(events)
        });
    }


    return (
        <div>
            <div>
                <Calendar
                    localizer={localizer}
                    style={{height: '420px'}}
                    events={events}
                />
            </div>
        </div>
    )
}

export default MyCalendar
