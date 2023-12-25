const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allposts = await Post.findAll({
      // Establishing descending order by id so most recent data is presented first
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const posts = allposts.map((post) => post.get({ plain: true }));
    // res.json(allposts); //simple json res for now
    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
