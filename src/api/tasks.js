export function getTasks() {
    return fetch(`http://localhost:3000/tasks`)
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) return data;
          throw data;
        });
      })
  }