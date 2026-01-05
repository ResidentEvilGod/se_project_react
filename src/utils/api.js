const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) return res.json();

  return res
    .json()
    .then((data) => Promise.reject(data?.message || `Error: ${res.status}`))
    .catch(() => Promise.reject(`Error: ${res.status}`));
}

function getToken() {
  return localStorage.getItem("jwt");
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

export function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  }).then((res) => {
    if (!res.ok) return Promise.reject(`Error deleting item: ${res.status}`);
    return;
  });
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
  }).then((res) => {
    if (!res.ok) return Promise.reject(`Error deleting item: ${res.status}`);
    return;
  });
}

export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}



