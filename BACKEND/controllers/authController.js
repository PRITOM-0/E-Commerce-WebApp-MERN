import User from "../Models/User.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exist !" });
    }

    //Hash password

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    return res.status(200).json({ message: "User created successfully !" });
  } catch (error) {
    res.status(500).json({ message: "Invalid user data" });
  }
};

export default signup;
