import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./ormconfig";
import { User } from "./entities/User";
import authRoutes from "./routes/authRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const user = new User();
  user.name = name;
  user.email = email;

  const userRepository = AppDataSource.getRepository(User);
  await userRepository.save(user);

  res.status(201).json(user);
});

app.get("/admin", authMiddleware, (req, res) => {
  res.json({ message: "Bienvenue sur la page d'administration!" });
});

app.get("/users", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  res.status(200).json(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: Number(id) });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connexion à la base de données réussie");
    app.listen(3001, () => {
      console.log("Serveur démarré sur http://localhost:3001");
    });
  })
  .catch((error) =>
    console.log("Erreur de connexion à la base de données", error)
  );

export { app };

// Démarre le serveur (si nécessaire)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
