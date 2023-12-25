async function deletePost(postId) {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Reload the page or update the post list
      document.location.reload();
    } else {
      // Handle deletion failure
      console.error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

// Event listener for delete buttons
document.addEventListener("click", (event) => {
  if (event.target && event.target.id.startsWith("deleteButton-")) {
    const postId = event.target.id.split("-")[1];
    deletePost(postId);
  }
});
