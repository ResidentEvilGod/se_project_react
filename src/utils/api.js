const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res
    .json()
    .then((data) => Promise.reject(data?.message || `Error: ${res.status}`))
    .catch(() => Promise.reject(`Error: ${res.status}`));
}

export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

export function addItem({ name, imageUrl, weather }, token) {
  if (!token) return Promise.reject("No token provided");

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

export function deleteItem(itemId, token) {
  if (!token) return Promise.reject("No token provided");

  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function updateProfile({ name, avatar }, token) {
  if (!token) return Promise.reject("No token provided");

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

/* ✅ Likes / Dislikes */
export function addCardLike(itemId, token) {
  if (!token) return Promise.reject("No token provided");

  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function removeCardLike(itemId, token) {
  if (!token) return Promise.reject("No token provided");

  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
