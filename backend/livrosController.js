import dados from '../biblioteca.json' assert { type: 'json' };

// Copia os dados do arquivo JSON (simula o banco de dados)
let livros = [...dados];

// FUNÇÕES DE LÓGICA 
// (Cailane criou a estrutura, Livia tem que completar colocando os comando do banco dentro de cada método)

// FIND: Listar livros por autor ou gênero
export async function find({ titulo, autor, genero }) {
    const filtro = {};

    if(titulo) filtro.titulo = titulo;
    if(autor) filtro.autor = autor;
    if(genero) filtro.genero = genero;

    // deve retornar um array com os livros encontrados com base no objeto filtro
}

// Retornar todas as categorias únicas
export async function getCategorias() {
  // deve retornar um array com os nomes das categorias, usar DISTINCT
}

// AGGREGATE : Contar quantos livros existem por gênero
export function aggregate(genero) {
    // deve retornar um objeto com os gêneros como chave e a soma de exemplares como valor
}

// INSERT : Adicionar novo livro
export function insert(livro) {
    //deve adicionar o objeto livro passado como parâmetro
    // deve retornar uma mensagem confirmando a inserção do livro ou de falha
    // deve validar se o livro já existe
}

// UPDATE : Atualizar quantidade de xemplares
export function update({ titulo, exemplares }) {
    // deve retornar mensagem de sucesso ou de falha
}

// DELETE : Remover livro
export function remove({ titulo }) {
  // deve retornar uma mensagem de sucesso ou de falha 
}

// REPLACE : Editar cadastro de um livro
export function replace({ titulo, novoLivro }) {
  // deve retornar uma mensagem de sucesso ou de falha 
}

// EMPRESTAR LIVRO
export function emprestar(livro, nomeUsuario) {
    if (livro.exemplares > 0) {
        livro.emprestimos.push(nomeUsuario);
        livro.exemplares -= 1;
        return { sucesso: true, mensagem: `Livro reservado com sucesso por ${nomeUsuario}.` };
    } else {
        return { sucesso: false, mensagem: "Livro indisponível para empréstimo." };
    }
}

// DEVOLVER LIVRO
export function devolver(livro, nomeUsuario) {
    const index = livro.emprestimos.indexOf(nomeUsuario);

    if (index !== -1) {
        livro.emprestimos.splice(index, 1);
        livro.exemplares += 1;
        return { sucesso: true, mensagem: `${nomeUsuario} devolveu o livro com sucesso.` };
    } else {
        return { sucesso: false, mensagem: "Usuário não possui este livro emprestado." };
    }
}