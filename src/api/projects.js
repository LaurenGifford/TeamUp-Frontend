export function getProjects() {
    return fetch(`http://teamup-task-app.herokuapp.com/projects`)
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) return data;
          throw data;
        });
      })
  }