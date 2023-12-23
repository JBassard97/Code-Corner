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
    res.render("homepage", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
