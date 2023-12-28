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

// TODO KEEP THIS
// // Creating a new comment
// router.post("/:postId", async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const text = req.body.text;

//     console.log("Received postId:", postId);
//     console.log("Received text:", text);

//     // Create a new comment in the database
//     const newComment = await Comment.create({
//       post_id: postId,
//       text,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newComment);
//     console.log(newComment);
//   } catch (err) {
//     console.error("Server Error:", err);
//     res.status(500).json("it's getting stuck here");
//   }
// });

module.exports = router;
