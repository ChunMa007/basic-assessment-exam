const users = [
  { email: "admin@gmail.com", password: "admin123" },
];

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  res.status(200).json({
    message: "Login Successful",
    user: { email: user.email }
  });
}
