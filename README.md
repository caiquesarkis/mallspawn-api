# Mallspawn-api
Mallspawn is an e-commerce prototyping API. Its main focus is to provide beginners with a basic API for creating personal study projects around e-commerce.

## Objetivo e Princípios
 **O que se espera alcançar | Com quais critérios**
Construir um cms focado em prototipação de ecommerces. 

## Brainstorm
### Funcionalidades do cms
- cadastro de produtos
- coleções
- seção de artigos(Blog, dúvidas, etc) Seção focada em adicionar conteúdo de texto sem precisar adicionar no código
- configurações gerais da loja

## Talvez
- Dashboard
- Site sobre o cms, documentação da api e tutoriais de integrações com aplicativos terceiros.

## Tasks
#Tasks 
- [x] Barra lateral e página de cadastro de produtos
	- [x] Design da barra lateral
	- [x] Design da página de cadastro de produtos
		- [x] Título
		- [x] Botão: Adicionar produto
		- [x] Filtro de pesquisa(Search bar por enquanto)
		- [x] Lista de produtos
- [ ] Desenvolver api CRUD para produtos com banco de dados
	- [x] Configuração inicial da api e criação do respositório
	- [x] Planejamento da database para criação de loja e cadastro de produtos
	- [x] Integração da database com a api
	- [x] Criação das tabelas do planejamento em SQL
	- [x] Interação dos endpoints com a database
	- [ ] API Endpoints
		- [x] GET
			- [x] Shop Owners
			- [x] Stores
			- [x] Products
		- [x] POST
			- [x] Create new account
			- [x] Login
			- [x] Logout
			- [x] Create store
			- [x] Add product
		- [ ] DELETE
			- [ ] Products
			- [ ] Shop Owners
			- [ ] Stores
		- [ ] PUT
			- [ ] Products
	- [ ] Hostear api em cloud
	- [ ] Implementar sistema de autenticação com o Passaport.js
	- [ ] Implementar e integrar design a api
	- [ ] Escrever documentação 
- [ ] Configurações gerais da loja
	- [ ] Design da página de configuração geral da loja
	- [ ] Implementação das novas rotas para configuração da loja na api
	- [ ] Implementar e integrar design a api
	- [ ] Escrever documentação  

## Resorces
**Links and notes that contribute to this project**
- [Design](https://www.figma.com/file/fw4fMMrNWkHwMHlWop44rh/Untitled?node-id=0%3A1)
- [Database Planning](https://whimsical.com/mallspawn-GqgVNZpYeHbkbdcu7oZiuC)
- [MySQL database download](https://dev.mysql.com/downloads/file/?id=511552)
- [MySQL integration with node](https://github.com/sidorares/node-mysql2)
- [SQL Cheat Sheet](https://devhints.io/mysql)
- [Authentication](https://www.passportjs.org/)
- [Typescript setup](https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html)
- [Basic login system with express](https://codeshack.io/basic-login-system-nodejs-express-mysql/)

#### 2022_05_21