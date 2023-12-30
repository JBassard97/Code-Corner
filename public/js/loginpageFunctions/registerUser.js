const registerUser = async (event) => {
  try {
    event.preventDefault();

    const newEmail = document.querySelector("#registerEmail").value.trim();
    const newUsername = document
      .querySelector("#registerUsername")
      .value.trim();
    const newPassword = document
      .querySelector("#registerPassword")
      .value.trim();
    const confirmPassword = document
      .querySelector("#confirmPassword")
      .value.trim();

    if (!newEmail || !newUsername || !newPassword || !confirmPassword) {
      alert("All fields must be filled in!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords must match!");
      return;
    }

    // Send the user data to the server
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        email: newEmail,
        username: newUsername,
        password: newPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If registration is successful, redirect the user or perform other actions
      document.location.replace("/dashboard");
    } else {
      // Handle registration failure
      const result = await response.json();
      alert(`Registration failed: Password must be > 8 characters!`);
    }
  } catch (err) {
    console.error("Error during registration:", err);
  }
};

document
  .getElementById("register-form")
  .addEventListener("submit", registerUser);
