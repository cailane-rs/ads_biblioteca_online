import express from "express";
import cors from "cors";
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

// Rotas
app.get("/livros", (req, res) => {
  const { titulo, autor, genero } = req.query;
  res.json(find({ titulo, autor, genero }));
});

app.post("/livros", (req, res) => {
  res.json(insert(req.body));
});

app.put("/livros", (req, res) => {
  res.json(update(req.body));
});

app.delete("/livros", (req, res) => {
  res.json(remove(req.body));
});

app.put("/livros/replace", (req, res) => {
  res.json(replace(req.body));
});

app.get("/categorias", (req, res) => {
  res.json(getCategorias());
});

app.get("/categorias/:genero", (req, res) => {
  res.json(aggregate(req.params.genero));
});

app.post("/livros/emprestar", (req, res) => {
  res.json(emprestar(req.body));
});

app.post("/livros/devolver", (req, res) => {
  res.json(devolver(req.body));
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
