import { model } from "mongoose";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";
import { changePasswordNotification } from "../emails/notificationMessages.js";

const userModel = model("User");

const sendEmailNotification = async (to, subject, message) => {
  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    throw new Error(error.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please give name, email and password. 🥸");
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      throw new Error("User already exists. 🙁");
    }

    const user = new userModel({
      name,
      email,
      password,
    });

    await user.save();

    return res.status(200).send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
      msg: {
        title: "You are signed up! 🤟🏻",
        desc: "Welcome!",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password)
      throw new Error("Please give email and password. 👀");
    const user = await userModel.findOne({ email });
    if (user) {
      // @ts-ignore
      const isMatch = await user.matchPassword(password);
      if (isMatch) {
        return res.status(200).send({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, rememberMe),
          },
          msg: {
            title: "Authentication successful! 🤩",
            desc: "Welcome Back.",
          },
        });
      } else throw new Error("Incorrect password. ✋🏻");
    } else {
      throw new Error("The email you have provided doesn't exist. 🤪");
    }
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user._id);
    if (user) {
      // @ts-ignore
      const isMatch = await user.matchPassword(oldPassword);
      if (isMatch) {
        user.password = newPassword;
        await user.save();

        const message = changePasswordNotification(user);
        await sendEmailNotification(user.email, message.subject, message.body);

        res.status(200).send({
          msg: {
            title: "Password Changed! 🎉",
            desc: "Its a good idea to change your password once in a while.",
          },
        });
      } else {
        throw new Error("Old password doesn't match. 😱");
      }
    } else {
      throw new Error("User doesn't exist. 🤯");
    }
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export {
  registerUser,
  login,
  changePassword,
};
