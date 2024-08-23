import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:", // Utilisation de la base de données en mémoire pour les tests
  entities: [User],
  synchronize: true, // Crée automatiquement les tables basées sur les entités
});
