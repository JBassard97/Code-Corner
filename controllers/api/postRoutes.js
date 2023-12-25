const router = require("express").Router();
const { Post } = require("../../models");

// Get ALL posts
router.get("/", async (req, res) => {
  try {
    const allposts = await Post.findAll({
      // Establishing descending order by id so most recent data is presented first
      order: [["id", "DESC"]],
    });
    const posts = allposts.map((posts) => posts.get({ plain: true }));
    res.json(posts); //simple json res for now
    // res.render("homepage", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific post by ID
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log("Received request for post ID:", postId);

    const post = await Post.findByPk(postId);

    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found" });
    }

    const postData = post.get({ plain: true });
    console.log("Found post data:", postData);

    res.json(postData);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json(err);
  }
});

// Update a post by ID
router.put("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, text } = req.body;

    // Check if the post exists
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update the post with new data
    await Post.update(
      { title, text },
      { where: { id: postId } }
    );

    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json(err);
  }
});


// Create a new post
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: "No Post found with this id!" });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
