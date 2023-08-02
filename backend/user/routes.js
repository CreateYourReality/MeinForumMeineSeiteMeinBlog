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
    const { name, email, password } = req.body;
    let user = new User({ name, email });
    user.setPassword(password);
    user = await user.save();
  
    res.send({ message: "New user created" });
  });

  userRouter.post("/login", multerMiddleware.none(), async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
    const user = await User.findOne({ email }).select("+hash").select("+salt");
    // dieses password würde den gleichen hash produzieren
    // (wie der in der Datenbank)
    const passwordIsValid = user.verifyPassword(password);
    if (passwordIsValid) {
      const token = generateAccessToken({ email });
      console.log(token);
  
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
  
  userRouter.get("/secure", authenticateToken, async (req, res) => {
    console.log(req.userEmail);
    res.send("SUCCESS");
  });