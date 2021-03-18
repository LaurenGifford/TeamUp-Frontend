export function getUser(id) {
    return fetch(`http://localhost:3000/teammates/${id}`)
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) return data;
          throw data;
        });
      })
  }