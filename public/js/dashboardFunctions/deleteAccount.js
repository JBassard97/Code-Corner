document.addEventListener("DOMContentLoaded", () => {
  const deleteAccountButton = document.getElementById("deleteAccountButton");

  if (deleteAccountButton) {
    deleteAccountButton.addEventListener("click", async () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete your account?"
      );

      if (confirmDelete) {
        try {
          // Replace ':id' with the actual user ID
          const userId = deleteAccountButton.dataset.userId;
          const response = await fetch(`/api/users/${userId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            // Redirect to the login page after successful deletion
            window.location.href = "/login";
          } else {
            console.error("Error deleting account");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  }
});
// document.addEventListener("DOMContentLoaded", () => {
//   const deleteAccountButton = document.getElementById("deleteAccountButton");

//   if (deleteAccountButton) {
//     deleteAccountButton.addEventListener("click", async () => {
//       const confirmDelete = confirm(
//         "Are you sure you want to delete your account?"
//       );

//       if (confirmDelete) {
//         try {
//           const response = await fetch("/api/users/:id", {
//             method: "DELETE",
//           });

//           if (response.ok) {
//             // Redirect to the login page after successful deletion
//             window.location.href = "/login";
//           } else {
//             console.error("Error deleting account");
//           }
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       }
//     });
//   }
// });
// document.addEventListener("click", async (event) => {
//   if (event.target.id === "deleteAccountButton") {
//     const confirmDelete = confirm(
//       "Are you sure you want to delete your account?"
//     );

//     if (confirmDelete) {
//       const response = await fetch(`/api/users/${userId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         // Redirect to the login page after successful deletion
//         window.location.href = "/login";
//       } else {
//         console.error("Error deleting account");
//       }
//     }
//   }
// });
