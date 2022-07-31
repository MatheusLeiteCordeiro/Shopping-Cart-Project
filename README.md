# Este é um projeto desenvolvido por [Matheus Emanuel](https://www.linkedin.com/in/matheus-emanuel-1a77b1221/), durante o período que cursou Desenvolvimento de Software na [Trybe](https://www.betrybe.com/), sendo o último projeto avaliativo do módulo de Fundamentos do Desenvolvimento Web.

##### A Trybe possui autoria nesse projeto quanto a criação das funções mockadas presentes na pasta "mocks".

### Tecnologias Utilizadas
     1. Node.js
     2. NPM
     3. Jest
     4. JavaScript
     5. HTML
     6. CSS
     7. API do Mercado Livre

##### Esse projeto foi realizado no intuito de por em prática os conhecimentos em manipulação de APIs e manipulação do DOM, assim como também em testes assíncronos, utilizando a biblioteca Jest.

### ⚙️ API do Mercado Livre

##### O [manual da API do Mercado Livre](https://developers.mercadolivre.com.br/pt_br/itens-e-buscas) contém todas as informações acerca da API (retorno, estrutura). Nesse projeto, são utilizados apenas alguns _endpoints_, sendo eles:

- `https://api.mercadolibre.com/sites/MLB/search?q=$QUERY`: traz uma lista de produtos, onde `$QUERY` é o termo a ser buscado. 


    Esse retorno possui várias informações acerca da lista de produtos. Dento do array `results` é onde você vai encontrar a lista de produtos.

- `https://api.mercadolibre.com/items/$ItemID`: traz detalhes de um determinado produto, onde `$ItemID` é o `id` do produto a ser buscado. 


    Esse retorno traz informações detalhadas sobre cada um dos produtos. Por exemplo, o `id` desse produto, o `title`, que o título do produto, `price`, que é o preço e assim por diante.

### Dependências

- ##### Para utilizar a biblioteca de testes Jest, será necessário utilizar o gerenciador de pacotes NPM. Portanto, instale o NPM e, após a clonagem do repositório, execute o comando: `npm install`.

### Testes

- ##### Para execução  dos tests, basta executar o comando: `npm test`. Assim, serão realizados testes em todos os arquivos de testes. 
- ##### Caso queira realizar o teste de uma função específica, execute o comando `npm test nome-da-função`.


      Todos os arquivos de testes estão dentro da pasta "tests"
      

### Aplicação

- ##### Para execução da aplicação, baixe a extensão `LiveServer`, no `VSCode`, vá até o arquivo "index.html", clique-o com o botão direito do mouse e então clique em "Open With Live Server".

##### Segue um Gif com uma ilustração da execução da aplicação:
    
![Project Gif](./executando-projeto.gif)
