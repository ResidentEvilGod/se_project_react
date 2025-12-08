const baseUrl = "http://localhost:3001/";
function getItems() {
  return fetch("${baseUrl}/items").then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject("Error fetching items: ${res.status}");
  });
}

function addItem({ name, imageUrl, weather }) {
  return fetch("${baseUrl}/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject("Error fetching items: ${res.status}");
  });
}
export { getItems, addItem };
