document.addEventListener("click", async (event) => {
  // Check if the clicked element has the class "deleteCommentButton"
  if (event.target.classList.contains("deleteCommentButton")) {
    const commentId = event.target.dataset.commentId;

    try {
      // Make a DELETE request to delete the comment
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Optionally, you can remove the deleted comment from the DOM
        event.target.closest(".commentDiv").remove();
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
