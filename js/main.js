/* 
 * GET
 * Get Items and update table
 */
const tableData = document.querySelector("#table-data");
console.log(tableData);

let getItems = () => {
  let responseData;
  let xhr = new XMLHttpRequest();
  // Get and process data
  processData(xhr);
  xhr.open("GET", "https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items");
  xhr.send();
}

/* Process the data retrieved from database */
let processData = (xhr) => {
  const main = document.querySelector("main");

  const loadingText = document.createElement("p");
  loadingText.id = "loading";
  loadingText.innerHTML = "Fetching Data...";
  loadingText.style.fontSize = "18px";
  loadingText.style.color = "#fff";
  main.appendChild(loadingText);

  xhr.addEventListener("load", function () {
    responseData = JSON.parse(xhr.response);
    responseData.sort((a, b) => a.id - b.id);

    responseData.forEach((item) => {
      const row = document.createElement("tr");

      const id = document.createElement("td");
      id.innerHTML = item.id;
      row.appendChild(id);

      const name = document.createElement("td");
      name.innerHTML = item.name;
      row.appendChild(name);

      const price = document.createElement("td");
      price.innerHTML = item.price;
      row.appendChild(price);

      const btnTblData = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.classList.add("del-btn");
      delBtn.id = item.id;
      delBtn.innerHTML = "Delete";
      btnTblData.appendChild(delBtn);
      row.appendChild(btnTblData);

      tableData.appendChild(row);
    });

    // Add delete button listeners after processing data
    addButtonListeners();
    loadingText.remove();
  });
}

/* 
 * POST
 * Create a popup w/ form to add items to the inventory 
 */

let form;
let formEventListener;
let formObject = {};
let formValues = {
  "id": "ID: ",
  "name": "Name: ",
  "price": "Price: ",
  "submit": "Add Item",
}

const addButton = document.querySelector("#add-btn");
const formContainer = document.querySelector("#form-container");

addButton.addEventListener('click', () => {
  form = document.createElement("form");
  form.id = "add-form"
  form.method = "POST";

  const header = document.createElement("h2");
  header.innerHTML = "Add Item to Inventory";
  form.appendChild(header);

  /* Create labels and inputs */
  for (const key in formValues) {
    const label = document.createElement("label");
    const input = document.createElement("input");

    if (key !== "submit") { // Add label and input fields to form
      label.htmlFor = key;
      label.innerText = formValues[key];

      input.type = "text";
      input.id = key;
      input.name = key;
      label.appendChild(input);
      form.appendChild(label);

    } else { // Add a submit button to form
      input.type = key;
      input.value = formValues[key];
      input.id = "submit-btn";
      form.appendChild(input);
    }
  }

  // Show popup w/ info
  formContainer.appendChild(form);
  formContainer.style.display = "flex";

  // Listen to form for submission
  listenToForm();
});

/* Listen to form */
let listenToForm = () => {
  formEventListener = form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form); // Extract form data
    console.log(formData);
    formData.forEach((val, key) => {
      formObject[key] = val;
      console.log(key);
      console.log(val);
    });

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(formObject));

    // Text for UX to notify user
    const submitText = document.createElement("p");
    submitText.innerHTML = "Submitting Data...";
    submitText.style.fontSize = "18px";
    form.appendChild(submitText);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  });
}

let closePopup = (e) => {
  if (e.target == formContainer) {
    const popForm = document.querySelector("#add-form");
    if (popForm) popForm.remove();
    formContainer.innerHTML = '';
    formContainer.style.display = "none";
  }
}


/* 
 * DELETE
 * After all delete buttons have been created add delete buttons 
 */
let addButtonListeners = () => {
  const deleteButtons = document.querySelectorAll(".del-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      let xhr = new XMLHttpRequest();
      xhr.open("DELETE", `https://lem6e5tfn2.execute-api.us-east-2.amazonaws.com/items/${button.id}`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();

      const main = document.querySelector("main");

      // Text for UX to notify user
      const submitText = document.createElement("p");
      submitText.innerHTML = "Deleting Data...";
      submitText.style.fontSize = "18px";
      submitText.style.color = "#fff";
      main.appendChild(submitText);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  })
}

window.onclick = closePopup;
window.onload = getItems;
