const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Fetch all posts with associated user details (excluding comments)
    const allPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Create an array to store posts with comments
    const postsWithComments = [];

    // Iterate through each post
    for (const post of allPosts) {
      const plainPost = post.get({ plain: true });

      // Fetch associated comments for the current post
      const comments = await Comment.findAll({
        where: { post_id: plainPost.id },
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
        attributes: ["text", "createdAt"],
      });

      // Add the comments to the current post
      plainPost.comments = comments.map((comment) =>
        comment.get({ plain: true })
      );

      // Push the post with comments into the array
      postsWithComments.push(plainPost);
    }

    // Render the homepage with posts, comments, and login status
    res.render("homepage", {
      posts: postsWithComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO KEEEEEEP THIS
// router.get("/", async (req, res) => {
//   try {
//     // Fetch all posts with associated user details (excluding comments)
//     const allPosts = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//     });

//     const posts = allPosts.map((post) => {
//       const plainPost = post.get({ plain: true });
//       return { ...plainPost }; // Initialize comments array as empty
//     });

//     // Render the homepage with posts, comments, and login status
//     res.render("homepage", { posts, logged_in: req.session.logged_in });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/login", async (req, res) => {
  try {
    res.render("loginpage");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    // Check if the user is logged in
    if (req.session.logged_in) {
      // If logged in, fetch user details
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
      });

      const user = userData.get({ plain: true });

      // Fetch posts of the logged-in user
      const userPosts = await Post.findAll({
        where: { user_id: req.session.user_id },
        order: [["createdAt", "DESC"]],
      });

      // Render the dashboard page with user information and posts
      res.render("dashboard", {
        user,
        posts: userPosts,
        logged_in: req.session.logged_in,
      });
    } else {
      // If not logged in, render the dashboard without user information
      res.render("dashboard", { logged_in: req.session.logged_in });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
