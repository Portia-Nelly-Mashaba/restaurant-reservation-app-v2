// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;  // Destructure email and password from the request body
  try {
    // Find the user by email
    const user = await User.findOne({ email });


    // Check if the user exists
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate a token if credentials are valid
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,  // Ensure you have a JWT secret in your environment variables
      { expiresIn: "1h" }      // Token expiry time
    );

    // Return the response with the token
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
