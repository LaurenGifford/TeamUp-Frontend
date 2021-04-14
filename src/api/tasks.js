export function getTasks() {
    return fetch(`http://teamup-task-app.herokuapp.com/tasks`)
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) return data;
          throw data;
        });
      })
  }