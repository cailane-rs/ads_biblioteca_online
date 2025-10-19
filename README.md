# Biblioteca Online

Este projeto é um sistema simples de **gerenciamento de biblioteca online**, desenvolvido como trabalho de faculdade.

## Funcionalidades

- Buscar livros por título, autor ou gênero
- Visualizar categorias
- Inserir novos livros
- Atualizar quantidade de exemplares
- Remover livros
- Substituir/editar cadastro de livros
- Reservar e devolver livros

> A lógica de backend está preparada para integração com MongoDB.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- [MongoDB](https://www.mongodb.com/) rodando localmente na porta padrão (27017)

---

## Como rodar o projeto

### Clonar o repositório
git clone https://github.com/cailane-rs/ads_biblioteca_online.git
cd ads_biblioteca_online

### Instalar dependências
npm install

### Rodar o backend
npm run dev

O servidor Node será iniciado em: http://localhost:3000

Abra o arquivo frontend/index.html usando o Live Server do VS Code (acesse o arquivo index.html > Clique com o botão direito > Open with Live Server).
Endereço típico que deve abrir: http://127.0.0.1:5500/frontend/index.html

## Tecnologias
- HTML / CSS / JavaScript (Frontend)
- Node.js / Express (Backend)
- MongoDB (Banco de dados)

