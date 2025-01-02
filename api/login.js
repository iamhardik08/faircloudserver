import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    password: bcrypt.hashSync("user123", 10),
    role: "user",
  },
];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
