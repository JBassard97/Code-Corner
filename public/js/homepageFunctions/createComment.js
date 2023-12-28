document.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (event.target.classList.contains("commentForm")) {
    const postId = event.target.dataset.postId;
    const commentContent = event.target.querySelector("#commentContent").value;

    console.log("postId:", postId);
    console.log("commentContent:", commentContent);

    const response = await fetch(`/api/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postId, text: commentContent }),
    });

    if (response.ok) {
      location.reload();
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  }
});
