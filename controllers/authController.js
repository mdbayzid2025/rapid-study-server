const jwt = require("jsonwebtoken");
const User = require("../Schema/UserSchema");
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(403).json({ success: false, message: "Already have an account" })

    const saltRounds = 10;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create({ ...req.body, password: hashedPassword })

    return res
      .status(200).json({ success: true, message: "Join success", user: newUser })
  } catch (error) {
    return res
      .status(500).json({ success: false, message: error?.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {

      try {
        const saltRounds = 10;

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = await User.create({ ...req.body, password: hashedPassword })


        // Payload to sign
        const payload = {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        };

        // Generate access token (15 minutes)
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "15m",
        });

        // Generate refresh token (7 days)
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
          expiresIn: "7d",
        });

        // Dynamic cookie config based on environment
        const isProduction = process.env.NODE_ENV === "production";

        // Set access token cookie
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000, // 15 mins
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
        });

        // Set refresh token cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
        });



        return res.status(200).json({
          success: true,
          message: "Login successful",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
      }
    }


    // Validate password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      return res.status(400).json({ message: "Invalid credentials" });

    // Payload to sign
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    // Generate access token (15 minutes)
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    // Generate refresh token (7 days)
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    // Dynamic cookie config based on environment
    const isProduction = process.env.NODE_ENV === "production";

    // Set access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 mins
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    // Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.logout = async (req, res) => {
  // Dynamic cookie config based on environment
  const isProduction = process.env.NODE_ENV === "production";

  try {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  // Dynamic cookie config based on environment
  const isProduction = process.env.NODE_ENV === "production";

  try {
    // Verify the refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // Create a new access token
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    // Set the new access token in a secure cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    // Optionally return success message (not needed if using cookies only)
    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};


exports.googleLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .populate({
        path: 'booking',
        populate: {
          path: 'property',
          model: 'Properties'
        }
      });
    if (user) {
      const accessToken = jwt.sign(user.email, process.env.JWT_SECRET_KEY);
      return res
        .status(200).json({ sucess: true, message: "Log In  success full", user: user, token: accessToken })
    } else {
      const newUser = await User.create(req.body);
      const accessToken = jwt.sign(user.email, process.env.JWT_SECRET_KEY);
      return res
        .status(200).json({ sucess: true, message: "Log In  success full", user: newUser, token: accessToken })
    }
  } catch (error) {
    return res
      .status(500).json({ sucess: false, message: error.message })
  }
}

exports.getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
      .populate({
        path: 'booking',
        populate: {
          path: 'property',
          model: 'Properties'
        }
      })
      .populate('my_properties');
    return res
      .status(200).json({ sucess: true, message: "Log In  success full", data: user })
  } catch (error) {
    return res
      .status(500).json({ sucess: false, message: error.message })
  }


}

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find()

    return res
      .status(200).json({ sucess: true, message: "Log In  success full", data: users })
  }
  catch (error) {
    return res
      .status(500).json({ sucess: false, message: error.message })
  }
}








/*

------------- Login ---------------
exports.login = async (req, res) => {
  try {

    console.log("llllog in", req.body)
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Don't have account, please join",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Email or password is invalid",
      });
    }

    // JWT payload
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role, // Ensure your User model has a `role` field
    };

    // Sign the token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '30s', // adjust as needed
    });

    // Refresh  token
     const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "5m",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {role: user.role, email: user.email},
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

---------------------- Refresh Token ---------------
exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  
  if (!token)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
*/