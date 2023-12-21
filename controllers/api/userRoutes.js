const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allusers = await User.findAll({
      order: [["id", "DESC"]],
    });
    const users = allusers.map((users) => users.get({ plain: true }));
    res.json(users); //simple json res for now
    // res.render("homepage", { users });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Check if the user making the request is the owner of the profile
    if (req.session.user_id !== parseInt(req.params.id, 10)) {
      res
        .status(403)
        .json({ message: "You don't have permission to delete this user." });
      return;
    }

    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    // If needed, you might want to clear the session after deleting the user
    req.session.destroy(() => {
      res.status(200).json({ message: "User deleted successfully." });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
