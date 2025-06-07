import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN);
      const user = await userModel.findById(decoded.id).select("-password");

      if (!user) {
        throw new Error("User not found");
      }

      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      next();
    } catch (error) {
      res.status(401).send({ msg: { title: "Not authorized, token failed" } });
    }
  }

  if (!token) {
    res.status(401).send({ msg: { title: "Not authorized, no token" } });
  }
};

export default protect;
