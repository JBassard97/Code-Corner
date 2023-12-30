document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("editButton")) {
    const postId = event.target.dataset.postId;

    // Fetch the post data
    console.log(`/api/posts/${postId}`);
    const response = await fetch(`/api/posts/${postId}`);
    const postData = await response.json();

    // Create the edit form dynamically
    const editPostFormContainer = document.getElementById(
      `editPostFormContainer-${postId}`
    );
    editPostFormContainer.innerHTML = `
      <div class="editForm" id="editForm${postId}">
        <h2>Edit Post</h2>
        <form class="editPostForm" data-post-id="${postId}">
          <label for="editTitle">Title:</label>
          <input type="text" id="editTitle${postId}" name="editTitle" value="${postData.title}" required>

          <label for="editText">Text:</label>
          <textarea id="editText${postId}" name="editText" required>${postData.text}</textarea>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    `;
  }
});
