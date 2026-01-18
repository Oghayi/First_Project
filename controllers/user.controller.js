import { User } from '../modules/user.module.js';

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create  user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({ message: 'User registered successfully', user: { _id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    //checking if the user already exixt
    const { email, password } = req.body;
    const user =await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: { _id: user._id, username: user.username, email: user.email } });
  } catch (error) {
       res.status(500).json({ message: "Internal server error", error: error });  
  }
}

const logoutUser = async (req, res) => {
  try{
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Logout successful' });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

export {
    registerUser,
    loginUser,
    logoutUser
}