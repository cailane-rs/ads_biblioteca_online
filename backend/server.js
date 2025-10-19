import express from "express";
import cors from "cors";
import { connectDB } from "./database/connection.js";
import {
  find,
  insert,
  update,
  remove,
  replace,
  getCategorias,
  aggregate,
  emprestar,
  devolver,
} from "./livrosController.js";

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Rotas (as suas mesmas rotas)
app.get("/livros", async (req, res) => {
  const { titulo, autor, genero } = req.query;
  res.json(await find({ titulo, autor, genero }));
});

app.post("/livros", async (req, res) => {
  res.json(await insert(req.body));
});

app.put("/livros", async (req, res) => {
  res.json(await update(req.body));
});

app.delete("/livros", async (req, res) => {
  res.json(await remove(req.body));
});

app.put("/livros/replace", async (req, res) => {
  res.json(await replace(req.body));
});

app.get("/categorias", async (req, res) => {
  res.json(await getCategorias());
});

app.get("/categorias/:genero", async (req, res) => {
  res.json(await aggregate(req.params.genero));
});

app.post("/livros/emprestar", async (req, res) => {
  res.json(await emprestar(req.body));
});

app.post("/livros/devolver", async (req, res) => {
  res.json(await devolver(req.body));
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
