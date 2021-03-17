export function getProjects() {
    return fetch(`http://localhost:3000/projects`)
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) return data;
          throw data;
        });
      })
  }