import dados from '../biblioteca.json' assert { type: 'json' };

// Copia os dados do arquivo JSON (simula o banco de dados)
let livros = [...dados];

// ======================
// FUNÇÕES DE LÓGICA (Cailane criou a estrutura, Livia tem que completar colocando os comando do banco dentro de cada método)
// ======================

// FIND: Listar livros por autor ou gênero
export async function find({ titulo, autor, genero }) {
    const filtro = {};

    if(titulo) filtro.titulo - titulo;
    if(autor) filtro.autor = autor;
    if(genero) filtro.genero = genero;

    return await Livro.find(filtro);
    // deve retornar um array com os livros encontrados
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


document.addEventListener("DOMContentLoaded", () => {

    // --- FIND: Buscar livros e exibir com botões de ação ---
    document.getElementById("btnFind").addEventListener("click", async () => {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;

    const livrosEncontrados = await find({ titulo, autor, genero });

    const resultadoFind = document.getElementById("resultadoFind");
    resultadoFind.innerHTML = ""; // limpa resultados antigos

    // criar lista de livros com botões de ação
    livrosEncontrados.forEach(l => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${l.titulo} — ${l.autor} (${l.ano})
        <button class="btnUpdate" data-titulo="${l.titulo}">Atualizar</button>
        <button class="btnRemove" data-titulo="${l.titulo}">Remover</button>
        <button class="btnReplace" data-titulo="${l.titulo}">Substituir</button>
        `;
        resultadoFind.appendChild(li);
    });
    });

    document.getElementById("resultadoFind").addEventListener("click", async (e) => {
    const btn = e.target;
    const titulo = btn.dataset.titulo;
    // --- UPDATE: Nova quantidade de exemplares ---
    if (btn.classList.contains("btnUpdate")) {
        const novaQtd = prompt(`Digite a nova quantidade de exemplares para "${titulo}":`);
        if (novaQtd !== null) {
            const resultado = await update({ titulo, exemplares: Number(novaQtd) });
            console.log(resultado);
        }
    }

    // --- REMOVE: Apaga o livro ---
    if (btn.classList.contains("btnRemove")) {
        const confirmar = confirm(`Deseja remover o livro "${titulo}"?`);
        if (confirmar) {
        const resultado = await remove({ titulo });
        console.log(resultado);
        }
    }
    // --- REPLACE: Edita o cadastro do livro ---
    if (btn.classList.contains("btnReplace")) {
        const novoTitulo = prompt("Novo título:");
        const novoAutor = prompt("Novo autor:");
        const novoAno = prompt("Novo ano:");
        const novoGenero = prompt("Novo gênero:");
        const novoExemplares = prompt("Nova quantidade de exemplares:");

        if (novoTitulo && novoAutor && novoAno && novoGenero && novoExemplares) {
        const novoLivro = {
            titulo: novoTitulo,
            autor: novoAutor,
            ano: Number(novoAno),
            genero: novoGenero,
            exemplares: Number(novoExemplares)
        };
        const resultado = await replace({ titulo, novoLivro });
        console.log(resultado);
        }
    }
    });


    // --- CATEGORIAS: listar gêneros e quantidade de livros ---
    document.getElementById("btnCategorias").addEventListener("click", async () => {
    const resultadoCategorias = document.getElementById("resultadoCategorias");
    resultadoCategorias.innerHTML = "";

    const categorias = await getCategorias();

    for (let genero of categorias) {
        const qtd = await aggregate(genero);
        const li = document.createElement("li");
        li.textContent = `${genero} — ${qtd} livros`;
        resultadoCategorias.appendChild(li);
    }
    });

    // INSERT
    document.getElementById("btnNovoLivro").addEventListener("click", () => {
    const formHTML = `
        <h2>Adicionar Novo Livro</h2>
        <input type="text" id="novoTitulo" placeholder="Título"><br>
        <input type="text" id="novoAutor" placeholder="Autor"><br>
        <input type="number" id="novoAno" placeholder="Ano"><br>
        <input type="text" id="novoGenero" placeholder="Gênero"><br>
        <input type="number" id="novoExemplares" placeholder="Exemplares"><br>
        <button id="btnSalvarLivro">Salvar</button>
    `;
    document.getElementById("conteudoPrincipal").innerHTML = formHTML;
    });

    // Event delegation para capturar clique no botão de salvar
    document.addEventListener("click", async (e) => {
    if (e.target && e.target.id === "btnSalvarLivro") {
        const novoLivro = {
        titulo: document.getElementById("novoTitulo").value,
        autor: document.getElementById("novoAutor").value,
        ano: Number(document.getElementById("novoAno").value),
        genero: document.getElementById("novoGenero").value,
        exemplares: Number(document.getElementById("novoExemplares").value),
        emprestimos: []
        };

        // Chama função insert (poderá ser conectada ao MongoDB)
        const resultado = await insert(novoLivro);

        // Exibir mensagem de sucesso
        alert(resultado.mensagem);

        // Redireciona para a página inicial
        window.location.reload(); // simples e direto
    }
    });

});
