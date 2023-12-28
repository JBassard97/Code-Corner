const router = require("express").Router();
const { Comment, User, Post } = require("../../models");

// Get ALL comments

router.get("/", async (req, res) => {
  try {
    // Fetch all comments with associated user and post details
    const allComments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Post,
          attributes: ["title"],
        },
      ],
      attributes: ["id", "text", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
    });

    // Map the comments data
    const comments = allComments.map((comment) => comment.get({ plain: true }));

    // Send the comments as JSON response
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Creating a new comment
router.post("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const text = req.body.text;

    console.log("Received postId:", postId);
    console.log("Received text:", text);

    // Create a new comment in the database
    const newComment = await Comment.create({
      post_id: postId,
      text,
      user_id: req.session.user_id,
    });

    // Fetch the post and include comments to ensure they are loaded
    const postWithComments = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
          attributes: ["text", "createdAt"],
        },
      ],
    });

    // Update the post's comments array without rendering the page
    const updatedPost = postWithComments.get({ plain: true });
    res.status(200).json({ post: updatedPost, comment: newComment });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json("it's getting stuck here");
  }
});

// deleting a comment
router.delete("/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Check if the logged-in user owns the comment (optional but recommended)
    const comment = await Comment.findByPk(commentId);

    if (!comment || comment.user_id !== req.session.user_id) {
      return res
        .status(404)
        .json({ error: "Comment not found or unauthorized" });
    }

    // Delete the comment
    await Comment.destroy({
      where: { id: commentId },
    });

    res.status(204).end(); // Respond with no content for successful deletion
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:commentId", async (req, res) => {
  try {
    // Fetch the comment data by ID
    const commentId = req.params.commentId;
    const commentData = await Comment.findByPk(commentId);

    // Render the edit comment page with the comment data
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:commentId", async (req, res) => {
  try {
    // Update the comment data
    const commentId = req.params.commentId;
    const { newText } = req.body;

    const updatedComment = await Comment.update(
      { text: newText },
      { where: { id: commentId } }
    );

    // Send a success response
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
