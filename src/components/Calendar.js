import { render } from 'react-dom'
import moment from 'moment'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
// BigCalendar.momentLocalizer(moment)
// require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

function MyCalendar() {
    const localizer = momentLocalizer(moment)
    const [events, setEvents] = useState([])

    const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID
    const API_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`)
        .then((err, resp) => {
            if (!err) {
                resp.json()
            }
        })
        .then(data => {
            console.log(data);
            data.items.map(event => {
            setEvents([...events, {
                start: event.start.date || event.start.dateTime,
                end: event.end.date || event.end.dateTime,
                title: event.summary,
            }])
        })}
        )

    }, [])

    // function getEvents(callback){
    //     const events = []
    //     fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`)
    //     .then((err, resp) => {
    //         if (!err) {
    //             resp.json()
    //         }
    //     })
    //     .then(data => data.items.map(event => {
    //         events.push({
    //             start: event.start.date || event.start.dateTime,
    //             end: event.end.date || event.end.dateTime,
    //             title: event.summary,
    //         })
    //     }))
    //     callback(events)
    // }


    return (
        <div>Calendar Hopefully
            <Calendar
                localizer={localizer}
                style={{height: '420px'}}
                events={events}
            />
        </div>
    )
}

export default MyCalendar