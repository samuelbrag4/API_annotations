# API - Sistema de Anotações 📝

API desenvolvida para gerenciar anotações, permitindo criar, listar, buscar, atualizar e excluir notas.

## Endpoints

### Notas
- **GET /notas**  
    Retorna todas as notas.  
    **Exemplo de teste:**  
    `localhost:4000/notas`

- **GET /notas/:id**  
    Retorna uma nota específica pelo ID.  
    **Exemplo de teste:**  
    `localhost:4000/notas/:id`

- **POST /notas**  
    Cria uma nova nota.  
    **Body Exemplo:**  
    ```json
    {
            "titulo": "Minha Nota",
            "conteudo": "Conteúdo da nota",
            "cor": "azul",
            "favorita": false,
            "tags": ["tag1", "tag2"]
    }
    ```  
    **Exemplo de teste:**  
    `localhost:4000/notas`

- **GET /notas/search/:term**  
    Busca notas pelo termo informado no título ou conteúdo.  
    **Exemplo de teste:**  
    `localhost:4000/notas/search/:term`

- **PUT /notas/:id**  
    Atualiza uma nota específica pelo ID.  
    **Body Exemplo:**  
    ```json
    {
            "titulo": "Nota Atualizada",
            "conteudo": "Novo conteúdo"
    }
    ```  
    **Exemplo de teste:**  
    `localhost:4000/notas/:id`

- **DELETE /notas/:id**  
    Exclui uma nota específica pelo ID.  
    **Exemplo de teste:**  
    `localhost:4000/notas/:id`

- **PATCH /notas/:id/favorite**  
    Marca uma nota como favorita.  
    **Exemplo de teste:**  
    `localhost:4000/notas/:id/favorite`

## Exemplos de Requisições e Rotas para Endpoints

### Criar uma Nota
**POST /notas**  
```bash
# Requisição:
http://localhost:4000/notas

# Resposta:
'{
        "titulo": "Exemplo",
        "conteudo": "Conteúdo de exemplo",
        "cor": "verde",
        "favorita": false,
        "tags": ["exemplo", "teste"]
}'
```

### Buscar Notas
**GET /notas**  
```bash
# Requisição:
http://localhost:4000/notas
```

### Atualizar uma Nota
**PUT /notas/:id**  
```bash
# Requisição:
http://localhost:4000/notas/1 

# Resposta:
'{
        "titulo": "Nota Atualizada",
        "conteudo": "Conteúdo atualizado"
}'
```

### Excluir uma Nota
**DELETE /notas/:id**  
```bash
# Requisição:
http://localhost:4000/notas/1
```

## Guia para Clonar o Projeto

1. Clone o repositório e entre no arquivo:  
     ```bash
     git clone <URL_DO_REPOSITORIO>
     cd API_annotations
     code .
     ```

2. Instale as dependências ⚠ Muito Importante ⚠:  
     ```bash
     npm install
     ```

3. Configure o arquivo `.env` (você deve criar ele):  
     ```env
     PORT=4000
     DATABASE_URL="file:./dev.db"
     ```

4. Execute as migrações do banco de dados:  
     ```bash
     npx prisma migrate dev
     ```

5. Inicie o servidor:  
     ```bash
     npm run dev
     ```

6. Acesse a API em:  
     ```
     http://localhost:4000
     ```