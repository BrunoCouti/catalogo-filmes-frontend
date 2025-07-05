# Catálogo de Filmes - Frontend

Interface web para o catálogo de filmes, desenvolvida com HTML, CSS e JavaScript puro, consumindo a API de backend.

## Funcionalidades

* Exibir a lista de filmes.
* Adicionar novos filmes.
* Editar filmes existentes.
* Excluir filmes.
* Interagir com a API de Back-end para todas as operações de CRUD (Create, Read, Update, Delete).

## Tecnologias Utilizadas

* **HTML5:** Estrutura semântica da página web.
* **CSS3:** Estilização e layout responsivo.
* **JavaScript (ES6+):** Lógica de interação com o usuário e comunicação assíncrona com a API.
* **Fetch API:** Utilizada para realizar requisições HTTP (GET, POST, PUT, DELETE) para a API de backend.

## Instalação e Execução Local

Este projeto front-end é estático e pode ser aberto diretamente no navegador. No entanto, para que ele funcione corretamente e interaja com os dados, a **API de back-end deve estar em execução**.

Siga os passos abaixo para configurar e rodar o front-end localmente:

1.  **Clone o repositório:**
    Abra seu terminal ou prompt de comando e execute:
    ```bash
    git clone [https://github.com/BrunoCouti/catalogo-filmes-frontend.git](https://github.com/BrunoCouti/catalogo-filmes-frontend.git)
    ```
    Navegue até a pasta do projeto:
    ```bash
    cd catalogo-filmes-frontend
    ```

2.  **Certifique-se de que a API de Back-end esteja rodando:**
    Para que o front-end consiga buscar e manipular os dados dos filmes, a API de back-end (que por padrão roda em `http://127.0.0.1:5000`) deve estar ativa.
    Se você ainda não a configurou ou não a iniciou, consulte o `README.md` do projeto [catalogo-filmes-backend](https://github.com/BrunoCouti/catalogo-filmes-backend) para as instruções detalhadas de como instalá-la e executá-la.

3.  **Abra o Front-end no Navegador:**
    Após garantir que a API de back-end está em execução, simplesmente abra o arquivo `index.html` em seu navegador de preferência.
    Você pode fazer isso navegando até a pasta `catalogo-filmes-frontend` no explorador de arquivos do seu sistema operacional e clicando duas vezes em `index.html`.

## Configuração da API (se necessário)

O arquivo `script.js` contém a URL base da API para onde as requisições são enviadas. Se a sua API de back-end estiver rodando em um endereço diferente de `http://127.0.0.1:5000`, você precisará editar esta linha no `script.js` para refletir o endereço correto:

```javascript
const API_URL = '[http://127.0.0.1:5000/filmes](http://127.0.0.1:5000/filmes)'; // Mude esta URL se sua API estiver em outro endereço
