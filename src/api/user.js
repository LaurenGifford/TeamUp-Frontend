export function getUser(id) {
    return fetch(`http://teamup-task-app.herokuapp.com/teammates/${id}`)
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) return data;
          throw data;
        });
      })
  }