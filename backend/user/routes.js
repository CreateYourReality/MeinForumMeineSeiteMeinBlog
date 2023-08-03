import {Router} from "express"
import multer from "multer"
import User from "./model.js"
import { authenticateToken, generateAccessToken } from "./authToken.js";

export const userRouter = Router();
const multerMiddleware = multer();

const hoursInMillisec = (hours) => {
    return 1000 * 60 * 60 * hours;
  };

  userRouter.get("/", async (req, res) => {
    const users = await User.find();
    res.send(users);
            
  });

  userRouter.post("/signup", multerMiddleware.none(), async (req, res) => {
    try{
        const { name, email, password } = req.body;
        let user = new User({ name, email });
        user.setPassword(password);
        user = await user.save();
        res.send({ message: "New user created" });
    }catch (error) {
        console.log(error);
    }
  });

  userRouter.post("/login", multerMiddleware.none(), async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+hash +salt");
    const passwordIsValid = user.verifyPassword(password);

    if (passwordIsValid) {
      const token = generateAccessToken({ email });
      //console.log(token);
      res.cookie("auth", token, { httpOnly: true, maxAge: hoursInMillisec(4) });
      res.send({ message: "Success", data: user });
    } else {
      res.status(404).send({
        message: "Failed to login",
        error: {
          message: "Password and E-Mail combination is wrong.",
        },
      });
    }
  });

  userRouter.get("/verify", authenticateToken, async (req, res) => {
    const token = req.cookies.auth;
    const user = await User.findeOne({ email: req.userEmail })
    if (token) {
        res.send({ message: "Valid token" }, user);
    } else {
        res.status(401).send({ message: "Invalid token" });
    }
});
  
  userRouter.get("/secure", authenticateToken, async (req, res) => {
    console.log(req.userEmail);
    console.log(req.userName);
    console.log(req.userName2);
    res.send("SUCCESS");
  });

  userRouter.post("/logout", async (req, res) => {
    res.clearCookie("auth");
    res.send({ message: "Logout successful" });
});