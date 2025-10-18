document.addEventListener("DOMContentLoaded", () => {

    // --- FIND: Buscar livros ---
    document.getElementById("btnFind").addEventListener("click", async () => {
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const genero = document.getElementById("genero").value;

        const query = new URLSearchParams({ titulo, autor, genero });
        const livrosEncontrados = await fetch(`/livros?${query}`).then(res => res.json());

        const resultadoFind = document.getElementById("resultadoFind");
        resultadoFind.innerHTML = "";

        livrosEncontrados.forEach(l => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div>
                    <strong>${l.titulo}</strong> — ${l.autor} (${l.ano})
                    <br><span>Disponíveis: ${l.exemplares}</span>
                </div>
                <div class="bookActions">
                    <button class="btnReservar" data-titulo="${l.titulo}">Reservar</button>
                    <button class="btnDevolver" data-titulo="${l.titulo}">Devolver</button>
                    <button class="btnUpdate" data-titulo="${l.titulo}">Atualizar</button>
                    <button class="btnReplace" data-titulo="${l.titulo}">Editar</button>
                    <button class="btnRemove" data-titulo="${l.titulo}">Remover</button>
                </div>
            `;
            resultadoFind.appendChild(li);
        });
    });

    // --- BOTÕES DOS LIVROS ---
    document.getElementById("resultadoFind").addEventListener("click", async (e) => {
        const btn = e.target;
        const titulo = btn.dataset.titulo;

        // --- UPDATE ---
        if (btn.classList.contains("btnUpdate")) {
            const novaQtd = prompt(`Digite a nova quantidade de exemplares para "${titulo}":`);
            if (novaQtd !== null) {
                const resultado = await fetch("/livros", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo, exemplares: Number(novaQtd) })
                }).then(res => res.json());
                console.log(resultado);
            }
        }

        // --- REMOVE ---
        if (btn.classList.contains("btnRemove")) {
            const confirmar = confirm(`Deseja remover o livro "${titulo}"?`);
            if (confirmar) {
                const resultado = await fetch("/livros", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo })
                }).then(res => res.json());
                console.log(resultado);
            }
        }

        // --- REPLACE ---
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
                const resultado = await fetch("/livros/replace", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo, novoLivro })
                }).then(res => res.json());
                console.log(resultado);
            }
        }

        // --- RESERVAR ---
        if (btn.classList.contains("btnReservar")) {
            const nome = prompt("Informe seu nome para reservar este livro:");
            if (nome) {
                const resultado = await fetch("/livros/emprestar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo, nomeUsuario: nome })
                }).then(res => res.json());
                alert(resultado.mensagem);
            }
        }

        // --- DEVOLVER ---
        if (btn.classList.contains("btnDevolver")) {
            const nome = prompt("Informe seu nome para devolver este livro:");
            if (nome) {
                const resultado = await fetch("/livros/devolver", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo, nomeUsuario: nome })
                }).then(res => res.json());
                alert(resultado.mensagem);
            }
        }
    });

    // --- CATEGORIAS ---
    document.getElementById("btnCategorias").addEventListener("click", async () => {
        const resultadoCategorias = document.getElementById("resultadoCategorias");
        resultadoCategorias.innerHTML = "";

        const categorias = await fetch("/categorias").then(res => res.json());

        for (let genero of categorias) {
            const qtd = await fetch(`/categorias/${genero}`).then(res => res.json());
            const li = document.createElement("li");
            li.textContent = `${genero} — ${qtd} livros`;
            resultadoCategorias.appendChild(li);
        }
    });

    // --- INSERT ---
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

    document.addEventListener("click", async (e) => {
        if (e.target && e.target.id === "btnSalvarLivro") {
            const novoLivro = {
                titulo: document.getElementById("novoTitulo").value,
                autor: document.getElementById("novoAutor").value,
                ano: Number(document.getElementById("novoAno").value),
                genero: document.getElementById("novoGenero").value,
                exemplares: Number(document.getElementById("novoExemplares").value)
            };
            const resultado = await fetch("/livros", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoLivro)
            }).then(res => res.json());
            alert(resultado.mensagem);
            window.location.reload();
        }
    });

});
