import jwt from "jsonwebtoken";

// userEmailObj = {email: ""}
export function generateAccessToken(userNameObj, persist = false) {
  return jwt.sign(userNameObj, process.env.TOKEN_SECRET, {
    expiresIn: persist ? "7d" : "4h",
  });
}

export function authenticateToken(req, res, next) {
  let token = null;
  if (req?.cookies?.auth) {
    token = req.cookies.auth;
  }

  if (!token) {
    const authHeader = req.headers["authorization"];
    token = authHeader && authHeader.split(" ")[1];
  }

  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err, user);
    if (err) return res.sendStatus(403);
    req.userName = user.userName;
    
    next();
  });
}