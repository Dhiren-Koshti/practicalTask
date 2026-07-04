const { validateEmail } = require("../validations/userValidations");
const userRepository = require("../repo/userRepository");

const createUserController = (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({ success: false, error: "Name must be required!" });
      return;
    }

    if (!email || !email.trim()) {
      res
        .status(400)
        .json({ success: false, error: "Email must be required!" });
      return;
    }

    if (!validateEmail(email)) {
      res
        .status(400)
        .json({ success: false, error: "Please send valid email!" });
      return;
    }

    const userData = { name, email };
    const user = userRepository.userCreateRepo(userData);

    res.status(200).json({ success: true, message: "User Created", user });
    return;
  } catch (error) {
    console.log("User Create Error ---->", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const fetchAllController = (req, res) => {
  try {
    const users = userRepository.fetchAllRepo();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("Fetch All User Error ---->", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const fetchUserController = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json({ success: false, error: "User id must be required" });
      return;
    }

    const user = userRepository.fetchUserRepo(id);

    if (!user.length) {
      res.status(404).json({ success: false, Message: "User Not Found" });
      return;
    }

    res.status(200).json({ success: true, user: user[0] });
  } catch (error) {
    console.log("Fetch User Error ---->", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const updateUserController = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json({ success: false, error: "User id must be required" });
      return;
    }

    const newData = req.body;

    if (newData.name && !newData.name.trim()) {
      res
        .status(400)
        .json({ success: false, error: "Please send Valid Name!" });
      return;
    }

    if (
      newData.email &&
      (!newData.email.trim() || !validateEmail(newData.email))
    ) {
      res
        .status(400)
        .json({ success: false, error: "Please send valid email!" });
      return;
    }

    const response = userRepository.updateUserRepo(id, newData);

    if (response.Message == "User is not found") {
      res.status(404).json({ success: false, response });
      return;
    }

    if (response.Message == "User is not found") {
      res.status(400).json({ success: false, response });
      return;
    }

    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log("Update User Error ---->", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

const deleteUserController = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json({ success: false, error: "User id must be required" });
      return;
    }

    const response = userRepository.deleteUserRepo(id);

    if (response.Message == "User is not found") {
      res.status(404).json({ success: false, response });
      return;
    }

    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log("Delete User Error ---->", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

module.exports = {
  createUserController,
  fetchAllController,
  fetchUserController,
  updateUserController,
  deleteUserController,
};
