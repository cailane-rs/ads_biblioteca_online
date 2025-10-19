import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true, unique: true },
  autor: { type: String, required: true },
  ano: { type: Number },
  genero: { type: String },
  exemplares: { type: Number, default: 1 },
  emprestimos: { type: [String], default: [] } // nomes de quem pegou emprestado
});

export const Livro = mongoose.model("Livro", livroSchema);
