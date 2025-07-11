const User = require("../Moduls/User.js");

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.status(201).json({ message: "SignUp successful" });
};



const GetallUser = async (req, res) => {
  try {
    const users = await User.find(); // ✅ fetch all users
    res.status(200).json({ users }); // 200 for success
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

module.exports = { SignUp,GetallUser };
