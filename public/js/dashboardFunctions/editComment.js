document.addEventListener("submit", async (event) => {
  // Check if the submitted form is an editCommentForm
  if (event.target.classList.contains("editCommentButton")) {
    event.preventDefault();

    const commentId = event.target.dataset.commentId;
    console.log(commentId);
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
    } else {
      // Handle error
      console.error("Error updating comment");
    }
  }
});

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("editCommentButton")) {
    const commentId = event.target.dataset.commentId;

    // Fetch the comment data
    const response = await fetch(`/api/comments/${commentId}`);
    const commentData = await response.json();

    // Create the edit form dynamically
    const editCommentFormContainer = document.getElementById(
      "editCommentFormContainer"
    );
    editCommentFormContainer.innerHTML = `
      <div class="editForm" id="editForm${commentId}">
        <h2>Edit Comment</h2>
        <form class="editCommentForm" data-comment-id="${commentId}">
          <label for="editComment">Comment:</label>
          <input type="text" id="editComment${commentId}" name="editComment" value="${commentData.text}" required>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    `;
  }
});
