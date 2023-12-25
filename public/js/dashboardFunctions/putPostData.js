document.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Check if the form being submitted is the edit form
  if (event.target.classList.contains("editPostForm")) {
    const postId = event.target.dataset.postId;
    const editTitle = document.getElementById(`editTitle${postId}`).value;
    const editText = document.getElementById(`editText${postId}`).value;

    // Send a PUT request to update the post
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title: editTitle, text: editText }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Post updated successfully");
      // reload the page or update the UI
      document.location.reload();
    } else {
      const result = await response.json();
      console.error("Error updating post:", result.message);
    }
  }
});
