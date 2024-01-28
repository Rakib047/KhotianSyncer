const userModel = require("../models/userModel");
const PostModel = require("../models/PostModel")
const jwt = require("jsonwebtoken");

//generating jwt(token)
const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //return from database,findOne()
    const loggedInUser = await userModel.loginStatic(email, password);

    const jwtToken = createToken(loggedInUser._id);

    const username = loggedInUser.username;
    const roll = loggedInUser.roll;
    const currentSemester = loggedInUser.currentSemester;
    const department = loggedInUser.department;
    res
      .status(200)
      .json({ email, jwtToken, username, roll, currentSemester, department });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//signupUser
const signupUser = async (req, res) => {
  const { email, password, username, roll, currentSemester, department } =
    req.body;

  try {
    //create in database will happen in signupStatic
    const newUser = await userModel.signupStatic(
      email,
      password,
      username,
      roll,
      currentSemester,
      department
    );

    const jwtToken = createToken(newUser._id);

    res
      .status(200)
      .json({ email, jwtToken, username, roll, currentSemester, department });
  } catch (err) {
    res.status(400).json({ error: err.message }, "here");
  }
};

//user update
const updateUser = async (req, res) => {
  const { prevEmail, username, roll, currentSemester, department, email } =
    req.body;
  const user = await userModel.profileInfoStatic(prevEmail); // Assuming you have middleware to extract user information from the token
  console.log("hmm");
  console.log(user._id);

  console.log(user.username);
  try {
    // Update user profile in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        username,
        roll,
        currentSemester,
        department,
        email,
      },
      { new: true }
    );

    // Respond with the updated user profile
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const pushNotification = async (req, res) => {
  const { userId } = req.params;
  const { actorRoll, actorName,postId, type } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Push the new notification to the notifications array
    user.notifications.push({ actorRoll, actorName,postId, type });

    // Save the user with the updated notifications
    await user.save();

    res.status(200).json({ message: "Notification pushed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNotification = async (req, res) => {
  const { userId } = req.params;
  const { actorRoll,postId } = req.body;
  console.log(req.body.actorRoll)

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the notification with the specified actorRoll
    const notificationIndex = user.notifications.findIndex(
      (notification) => (notification.actorRoll === actorRoll && notification.postId===postId)
    );

    // If the notification index is found, remove it from the notifications array
    if (notificationIndex !== -1) {
      console.log("found")
      user.notifications.splice(notificationIndex, 1);
      await user.save();
      return res.status(200).json({ message: "Notification deleted successfully" });
    } else {
      return res.status(404).json({ error: "Notification not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotifications = async (req, res) => {
  const userId = req.userProperty._id
  console.log("here")

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch notifications that have a postId associated with an existing post
    const notificationsWithValidPost = await Promise.all(
      user.notifications.map(async (notification) => {
        if (notification.postId) {
          const post = await PostModel.findById(notification.postId);
          if (post) {
            return notification;
          }
        }
        return null;
      })
    );

    // Filter out null values (notifications without valid posts)
    const validNotifications = notificationsWithValidPost.filter(
      (notification) => notification !== null
    );

    res.status(200).json({ notifications: validNotifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  loginUser,
  signupUser,
  updateUser,
  pushNotification,
  deleteNotification,
  getNotifications
};
