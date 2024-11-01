/* Handle form submissions */
const form = document.querySelector("#add-form");
let formObject = {};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form); // Extract form data
  formData.forEach((value, key) => formObject[key] = value);

  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(formObject));
});
