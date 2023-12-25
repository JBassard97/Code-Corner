const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

// localhost:3001/api/users/
// json response with all users
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

// Create a new user
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

// localhost:3001/api/users/login

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
    req.session.destroy((err) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Failed to destroy session" });
      } else {
        res.status(204).json({ success: true });
      }
    });
  } else {
    res
      .status(404)
      .json({ success: false, message: "No active session to log out" });
  }
});

router.put("/password", async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);

    if (!user || !bcrypt.compareSync(req.body.currentPassword, user.password)) {
      return res.status(400).json({ message: "Invalid current password." });
    }

    // Hash and update the new password
    const newHashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
    await User.update(
      { password: newHashedPassword },
      { where: { id: user.id } }
    );

    // Update the session with the new user data after changing the password
    req.session.user_id = user.id;
    req.session.logged_in = true;

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});
// router.put("/password", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.session.user_id);

//     if (!user || !bcrypt.compareSync(req.body.currentPassword, user.password)) {
//       return res.status(400).json({ message: "Invalid current password." });
//     }

//     // Hash and update the new password
//     const newHashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
//     await User.update(
//       { password: newHashedPassword },
//       { where: { id: user.id } }
//     );

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("Error changing password:", err);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

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
