# TeamUp
##### A tasksharing app for teams to track projects, tasks, and teammate assignments

### Table of Contents
- [Functionality](#functionality)
- [Getting Started](#getting-started)
- [Next Steps](#next-steps)

### Functionality
This app allows a team to view all of their current projects, project details, and which tasks the team's memeber's are currently working on. Teammamtes can add projects for their team or tasks to a specific project. They can also volunteer for a task, and assign it to or remove it from another teammate. On their home dashboard, a user will see all of their current tasks organized by project association and can mark tasks as completed to recieve TeamUp points! The dashboard also features a suggested task to get your work started for the day. Teammates can add tasks to their primary Google calendar after logging into their Google account and are able to later view these tasks on the calendar page.

### Frameworks
This project was created with a React frontend using JSON Web Token for Authentication. It utilizes Google's Calendar API to authenticate users and allow for real time schedule integration and management. The backend is built with a RESTful Rails API and a Postgresql database.

### Getting Started
1. Fork and clone this frontend repo and its accompanying [backend](https://github.com/LaurenGifford/TeamUp-Backend) onto your local machine.
2. While in the frontend directory, run `npm install` in the terminal to ensure all necessary packages are installed.
3. Run `npm start` to start up a server listening on localhost:3001.
4. Complete backend setup specified in that repository.
5. Finally, if a browser tab has not already opened up, please visit localhost:3001 in browser to launch the app.
6. If you would prefer to skip the setup and directly view a running version, please checkout the deployed app on Netlify (coming soon)! 

### Next Steps
In subsequent versions of this app, team leader permissions will be added to allow for more customized project management.
Feedback and contributions are welcomed.

