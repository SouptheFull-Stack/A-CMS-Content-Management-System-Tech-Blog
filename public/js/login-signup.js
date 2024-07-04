// function to handle login form submission so users can login
const loginFormHandler = async (event) => {
  event.preventDefault(); // preventing the default event of page refresh when we submit the form

  // get handle of the user fields for login (in the views form)
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // debugging test console, for personal use
  console.log("Username:", username);
  console.log("Password:", password);

  if (username && password) {
    // checks if both fields have been input to make sure it works
    // send a post fetch for our API endpoint, to then verify the fields with the database data of the user
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

// function to handle signup form submission so users can signup
const signupFormHandler = async (event) => {
  event.preventDefault(); // preventing the default event of page refresh when we submit the form

  // creating a variable for the minimum password length (for verification)
  const MINIMUM_LENGTH = 5;

  // get handle of the user fields for singup (in the views form)
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // error handler, to verify if the password created matches the minimum length requirement with our User model
  if (password.length < MINIMUM_LENGTH) {
    alert("Password must be at least 5 characters!"); // lets the user know what they did wrong
    return; // Stop further execution if password length is insufficient
  }

  // checks if both fields have been input to make sure it works
  // send a post fetch for our API endpoint, to then verify the fields with the database data of the user
  if (username && password) {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to sign up.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up.");
    }
  }
};

// making event listeners to trigger the login and signup functions
// when the 'submit' event happens (user clicks submit button in form)
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

// handler for elements used in function below
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const swapToSignup = document.getElementById("swap-to-signup");
const swapToLogin = document.getElementById("swap-to-login");

// function to have the login and signup forms swap in the UI, to look neater
function swapLoginForm(event) {
  event.preventDefault();

  if (loginForm.classList.contains("hidden")) {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  } else {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  }
}

// event listeners to trigger the swap of forms upon the "click" event (user clicks on link in the forms)
swapToLogin.addEventListener("click", swapLoginForm);
swapToSignup.addEventListener("click", swapLoginForm);
