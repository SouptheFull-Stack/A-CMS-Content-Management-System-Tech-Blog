const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (username && password) {
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

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
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
  }
};

document
  .getElementById("login-btn")
  .addEventListener("submit", loginFormHandler);

document
  .getElementById("signup-btn")
  .addEventListener("submit", signupFormHandler);

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const swapToSignup = document.getElementById("swap-to-signup");
const swapToLogin = document.getElementById("swap-to-login");

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

swapToLogin.addEventListener("click", swapLoginForm);
swapToSignup.addEventListener("click", swapLoginForm);
