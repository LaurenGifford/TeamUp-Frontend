import { render } from 'react-dom'
import moment from 'moment'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import request from "superagent";
// BigCalendar.momentLocalizer(moment)
// require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

function MyCalendar() {
    const localizer = momentLocalizer(moment)
    const [events, setEvents] = useState([])

    const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID
    const API_KEY = process.env.REACT_APP_API_KEY
    console.log(CALENDAR_ID, API_KEY)

    let GOOGLE_CALENDAR_URL = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
    
    useEffect(() => {
        getEvents(events => {
            setEvents(events)
        })
    }, [])

    function getEvents(callback) {
        request.get(GOOGLE_CALENDAR_URL).end((err, resp) => {
            if (!err) {
            const events = [];
            JSON.parse(resp.text).items.map(event => {
                return events.push({
                start: new Date(event.start.dateTime.toString()),
                end: new Date(event.end.dateTime.toString()),
                title: event.summary
                });
            });
            callback(events);
            }
        });
    }


    return (
        <div>
            <Calendar
                localizer={localizer}
                style={{height: '420px'}}
                events={events}
            />
        </div>
    )
}

export default MyCalendar


// <!--Add buttons to initiate auth sequence and sign out-->
// <button id="authorize_button" style="display: none;">Authorize</button>
// <button id="signout_button" style="display: none;">Sign Out</button>

// <pre id="content" style="white-space: pre-wrap;"></pre>

// <script type="text/javascript">
//   // Client ID and API key from the Developer Console
//   var CLIENT_ID = '<YOUR_CLIENT_ID>';
//   var API_KEY = '<YOUR_API_KEY>';

//   // Array of API discovery doc URLs for APIs used by the quickstart
//   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

//   // Authorization scopes required by the API; multiple scopes can be
//   // included, separated by spaces.
//   var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

//   var authorizeButton = document.getElementById('authorize_button');
//   var signoutButton = document.getElementById('signout_button');

//   /**
//    *  On load, called to load the auth2 library and API client library.
//    */
//   function handleClientLoad() {
//     gapi.load('client:auth2', initClient);
//   }

//   /**
//    *  Initializes the API client library and sets up sign-in state
//    *  listeners.
//    */
//   function initClient() {
//     gapi.client.init({
//       apiKey: API_KEY,
//       clientId: CLIENT_ID,
//       discoveryDocs: DISCOVERY_DOCS,
//       scope: SCOPES
//     }).then(function () {
//       // Listen for sign-in state changes.
//       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//       // Handle the initial sign-in state.
//       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//       authorizeButton.onclick = handleAuthClick;
//       signoutButton.onclick = handleSignoutClick;
//     }, function(error) {
//       appendPre(JSON.stringify(error, null, 2));
//     });
//   }

//   /**
//    *  Called when the signed in status changes, to update the UI
//    *  appropriately. After a sign-in, the API is called.
//    */
//   function updateSigninStatus(isSignedIn) {
//     if (isSignedIn) {
//       authorizeButton.style.display = 'none';
//       signoutButton.style.display = 'block';
//       listUpcomingEvents();
//     } else {
//       authorizeButton.style.display = 'block';
//       signoutButton.style.display = 'none';
//     }
//   }

//   /**
//    *  Sign in the user upon button click.
//    */
//   function handleAuthClick(event) {
//     gapi.auth2.getAuthInstance().signIn();
//   }

//   /**
//    *  Sign out the user upon button click.
//    */
//   function handleSignoutClick(event) {
//     gapi.auth2.getAuthInstance().signOut();
//   }

//   /**
//    * Append a pre element to the body containing the given message
//    * as its text node. Used to display the results of the API call.
//    *
//    * @param {string} message Text to be placed in pre element.
//    */
//   function appendPre(message) {
//     var pre = document.getElementById('content');
//     var textContent = document.createTextNode(message + '\n');
//     pre.appendChild(textContent);
//   }

//   /**
//    * Print the summary and start datetime/date of the next ten events in
//    * the authorized user's calendar. If no events are found an
//    * appropriate message is printed.
//    */
//   function listUpcomingEvents() {
//     gapi.client.calendar.events.list({
//       'calendarId': 'primary',
//       'timeMin': (new Date()).toISOString(),
//       'showDeleted': false,
//       'singleEvents': true,
//       'maxResults': 10,
//       'orderBy': 'startTime'
//     }).then(function(response) {
//       var events = response.result.items;
//       appendPre('Upcoming events:');

//       if (events.length > 0) {
//         for (i = 0; i < events.length; i++) {
//           var event = events[i];
//           var when = event.start.dateTime;
//           if (!when) {
//             when = event.start.date;
//           }
//           appendPre(event.summary + ' (' + when + ')')
//         }
//       } else {
//         appendPre('No upcoming events found.');
//       }
//     });
//   }