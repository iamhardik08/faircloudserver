import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export default function handler(req, res) {
  if (req.method === "GET") {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return res.json({ message: `Welcome to the dashboard, ${decoded.role}` });
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
