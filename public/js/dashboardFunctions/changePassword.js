document
  .querySelector("#changePasswordForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const currentPassword = document
      .querySelector("#currentPassword")
      .value.trim();
    const newPassword = document.querySelector("#newPassword").value.trim();

    // Send the password change request to the server
    const response = await fetch("/api/users/password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Password change successful, you might display a success message or redirect
      document.location.reload(); // Reload the page for simplicity
    } else {
      // Handle password change failure
      const result = await response.json();
      console.error("Password change failed:", result.message);
    }
  });
