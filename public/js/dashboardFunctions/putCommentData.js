document.addEventListener("submit", async (event) => {
  if (event.target.classList.contains("editCommentForm")) {
    event.preventDefault();

    const commentId = event.target.dataset.commentId;
    const newText = event.target.querySelector(
      `#editComment${commentId}`
    ).value;

    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newText }),
    });

    if (response.ok) {
      // Handle success, e.g., close the edit form or update the UI
      console.log("Comment updated successfully");
      location.reload();
    } else {
      // Handle error
      console.error("Error updating comment");
    }
  }
});
