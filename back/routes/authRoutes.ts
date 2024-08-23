import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { AppDataSource } from "../ormconfig";

const router = Router();

// Route pour la connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Identifiants incorrects" });
  }

  if (!user.isAdmin) {
    return res.status(403).json({ message: "Accès non autorisé" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    "my-secret_pswkey9757",
    { expiresIn: "1h" }
  );
  res.json({ token });
});

export default router;
