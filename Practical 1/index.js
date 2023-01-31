function createSpanChildWithError(sibling, textContent) {
  let text = document.createTextNode(textContent);
  let span = document.createElement("span");
  span.classList.add("error");
  span.appendChild(text);
  sibling.parentNode.insertBefore(span, sibling.nextSibling);
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#FirstName");
  const lastName = document.querySelector("#LastName");
  const genderContainer = document.querySelector("#Gender");
  const gender = document.querySelectorAll("input[type='radio']");
  const contact = document.querySelector("#Contact");
  const address = document.querySelector("#Address");
  const education = document.querySelector("#EducationDescription");
  const degree = document.querySelector("#Education");
  const cocurr = document.querySelector("#Co-Curricular");
  const ageContainer = document.querySelector("#Age");
  const email = document.querySelector("#Email");

  /* Find the selected gender from the given Input */
  const validGenders = ["male", "female", "others"];
  let selectedGender = "";
  gender.forEach((g) => {
    if (g.checked) {
      selectedGender = g.value;
    }
  });

  /* Convert Age into a number from string */
  const age = parseInt(ageContainer.value);

  /* Regex pattern to check contact number */
  const CONTACT_REGEX = /[0-9]{10}/;

  if (name.value.length < 2) {
    name.focus();
    createSpanChildWithError(name, "Name should be atleast 2 characters long!");
    return;
  }
  if (lastName.value.length < 2) {
    lastName.focus();
    createSpanChildWithError(
      lastName,
      "Last Name should be atleast 2 characters long!"
    );
    return;
  }

  if (!CONTACT_REGEX.test(parseInt(contact.value))) {
    contact.focus();
    createSpanChildWithError(lastName, "Please Fill apropriate contact number");
    return;
  }

  if (!validGenders.includes(selectedGender)) {
    genderContainer.scrollIntoView();
    createSpanChildWithError(genderContainer, "Please select any one option!");
    return;
  }

  if (address.value.length < 5) {
    address.focus();
    createSpanChildWithError(
      address,
      "Address should be atleast 5 characters long!"
    );
    return;
  }

  if (education.value.length < 5) {
    education.focus();
    createSpanChildWithError(
      education,
      "Education description should be atleast 5 characters long!"
    );
    return;
  }

  if (cocurr.value.length < 5) {
    cocurr.focus();
    createSpanChildWithError(
      cocurr,
      "Co-Curricular activities should be atleast 5 characters long!"
    );
    return;
  }

  if (age < 15) {
    ageContainer.focus();
    createSpanChildWithError(ageContainer, "Age should not be below 15!");
    return;
  }
  alert("Sucess!");

  const payload = {
    name: name.value.trim(),
    lastName: lastName.value.trim(),
    contact: contact.value,
    gender: selectedGender,
    address: address.value.trim(),
    education: education.value.trim(),
    degree: degree.value,
    cocurr: cocurr.value.trim(),
    age,
    email: email.value,
  };
  console.log(payload);
  localStorage.setItem("payload", JSON.stringify(payload));
  window.location.href = "/profile.html";
});
