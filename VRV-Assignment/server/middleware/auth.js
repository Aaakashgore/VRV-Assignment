import jwt from "jsonwebtoken";

const secret = 'secret';

const auth = async (req, res, next) => {
  try {
    console.log("Middleware")
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log(1);
      return res.status(401).json({ message: 'Token is required for authentication' });
    }

    const decodedData = jwt.verify(token, secret);
    console.log(decodedData);
    req.role = decodedData?.role;

    next();
  } catch (error) {
    console.error(error);
    console.log(2);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;
