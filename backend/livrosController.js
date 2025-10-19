import { Livro } from "./livroModel.js";

// FIND
export async function find({ titulo, autor, genero }) {
  const filtro = {};
  if (titulo) filtro.titulo = { $regex: titulo, $options: "i" };
  if (autor) filtro.autor = { $regex: autor, $options: "i" };
  if (genero) filtro.genero = { $regex: genero, $options: "i" };

  return await Livro.find(filtro);
}

// CATEGORIAS
export async function getCategorias() {
  const categorias = await Livro.distinct("genero");
  return categorias;
}

// AGGREGATE
export async function aggregate(genero) {
  const resultado = await Livro.aggregate([
    { $match: { genero } },
    { $group: { _id: "$genero", total: { $sum: "$exemplares" } } }
  ]);
  return resultado.length ? resultado[0].total : 0;
}

// INSERT
export async function insert(livro) {
  try {
    const existente = await Livro.findOne({ titulo: livro.titulo });
    if (existente) {
      return { sucesso: false, mensagem: "Livro já cadastrado." };
    }
    await Livro.create(livro);
    return { sucesso: true, mensagem: "Livro inserido com sucesso!" };
  } catch (error) {
    return { sucesso: false, mensagem: "Erro ao inserir livro." };
  }
}

// UPDATE
export async function update({ titulo, exemplares }) {
  const resultado = await Livro.updateOne({ titulo }, { $set: { exemplares } });
  if (resultado.matchedCount)
    return { sucesso: true, mensagem: "Quantidade atualizada com sucesso!" };
  else
    return { sucesso: false, mensagem: "Livro não encontrado." };
}

// DELETE
export async function remove({ titulo }) {
  const resultado = await Livro.deleteOne({ titulo });
  if (resultado.deletedCount)
    return { sucesso: true, mensagem: "Livro removido com sucesso!" };
  else
    return { sucesso: false, mensagem: "Livro não encontrado." };
}

// REPLACE
export async function replace({ titulo, novoLivro }) {
  const resultado = await Livro.replaceOne({ titulo }, novoLivro);
  if (resultado.matchedCount)
    return { sucesso: true, mensagem: "Livro atualizado com sucesso!" };
  else
    return { sucesso: false, mensagem: "Livro não encontrado." };
}

// EMPRESTAR
export async function emprestar({ titulo, nomeUsuario }) {
  const livro = await Livro.findOne({ titulo });
  if (!livro) return { sucesso: false, mensagem: "Livro não encontrado." };

  if (livro.exemplares > 0) {
    livro.emprestimos.push(nomeUsuario);
    livro.exemplares -= 1;
    await livro.save();
    return { sucesso: true, mensagem: `Livro reservado com sucesso por ${nomeUsuario}.` };
  } else {
    return { sucesso: false, mensagem: "Livro indisponível para empréstimo." };
  }
}

// DEVOLVER
export async function devolver({ titulo, nomeUsuario }) {
  const livro = await Livro.findOne({ titulo });
  if (!livro) return { sucesso: false, mensagem: "Livro não encontrado." };

  const index = livro.emprestimos.indexOf(nomeUsuario);
  if (index !== -1) {
    livro.emprestimos.splice(index, 1);
    livro.exemplares += 1;
    await livro.save();
    return { sucesso: true, mensagem: `${nomeUsuario} devolveu o livro com sucesso.` };
  } else {
    return { sucesso: false, mensagem: "Usuário não possui este livro emprestado." };
  }
}
