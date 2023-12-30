document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("editCommentButton")) {
    const commentId = event.target.dataset.commentId;

    // Fetch the comment data
    const response = await fetch(`/api/comments/${commentId}`);
    const commentData = await response.json();

    // Create the edit form dynamically
    const editCommentFormContainer = document.getElementById(
      `editCommentFormContainer-${commentId}`
    );
    editCommentFormContainer.innerHTML = `
      <div class="editForm" id="editForm${commentId}">
        <h3>Edit Comment</h3>
        <form class="editCommentForm" data-comment-id="${commentId}">
          <label for="editComment">Comment:</label>
          <input type="text" id="editComment${commentId}" name="editComment" value="${commentData.text}" required>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    `;
  }
});
