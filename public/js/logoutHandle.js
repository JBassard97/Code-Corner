// TODO: adding logic to logout button in main.handlebars

const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const result = await response.json();
    if (result.success) {
      // Set the logged_in value to false on the client side
      window.sessionStorage.setItem("logged_in", "false");

      // Redirect to the login page
      document.location.replace("/login");
    } else {
      console.error("Logout failed:", result.message);
    }
  } else {
    console.error("Logout failed:", response.statusText);
  }
};

document.querySelector("#logoutButton").addEventListener("click", logout);

