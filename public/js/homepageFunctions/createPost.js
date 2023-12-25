// homepageFunctions.js

document.addEventListener("DOMContentLoaded", () => {
  const newPostForm = document.getElementById("newPostForm");

  if (newPostForm) {
    newPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = document.getElementById("postTitle").value.trim();
      const text = document.getElementById("postText").value.trim();

      if (title && text) {
        try {
          const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ title, text }),
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
            // Reload the page or update the post list
            document.location.reload();
          } else {
            // Handle post creation failure
            console.error("Failed to create post");
          }
        } catch (error) {
          console.error("Error creating post:", error);
        }
      }
    });
  }
});
