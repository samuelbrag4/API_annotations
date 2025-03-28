import notaModel from "../models/notaModel.js";
class NotaController {

  // BUSCAR TODOS
  getAll = async (req, res) => {
    try {
      const notas = await notaModel.getAll();
      res.json(notas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar as notas" });
    }
  };

  // BUSCAR TODOS PELO ID
  getById = async (req, res) => {
    const { id } = req.params;

    try {
      if (isNaN(Number(id))) {
        return res
          .status(400)
          .json({ erro: "O ID deve ser um número válido." });
      }

      const nota = await notaModel.getById(Number(id));

      if (!nota) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
      }

      res.json(nota);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao Buscar a Nota pelo Id" });
    }
  };

  // CRIAR NOVA TAREFA
  create = async (req, res) => {
    const { titulo, conteudo, cor, favorita, tags } = req.body;
  
    try {
      if (!titulo || !conteudo || !cor || favorita === undefined) {
        return res.status(400).json({
          erro: "Os campos 'titulo', 'conteudo', 'cor' e 'favorita' são obrigatórios.",
        });
      }
  
      if (typeof titulo !== "string") {
        return res.status(400).json({ erro: "O campo 'titulo' deve ser uma string." });
      }
  
      if (typeof conteudo !== "string") {
        return res.status(400).json({ erro: "O campo 'conteudo' deve ser uma string." });
      }
  
      if (typeof cor !== "string") {
        return res.status(400).json({ erro: "O campo 'cor' deve ser uma string." });
      }
  
      if (typeof favorita !== "boolean") {
        return res.status(400).json({ erro: "O campo 'favorita' deve ser um booleano." });
      }
  
      if (!Array.isArray(tags) || !tags.every(tag => typeof tag === "string")) {
        return res.status(400).json({ erro: "O campo 'tags' deve ser um array de strings." });
      }
  
      const novaNota = await notaModel.create(titulo, conteudo, cor, favorita, tags);
      res.status(201).json(novaNota);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar a nota." });
    }
  };

  // PROCURAR POR TERMO
  searchByTerm = async (req, res) => {
    const { term } = req.params;

    console.log("Termo recebido:", term); 
    if (!term || term.trim() === "") {
      return res
        .status(400)
        .json({ erro: "O termo de busca não pode estar vazio." });
    }

    try {
      const notas = await notaModel.searchByTerm(term);
      res.json(notas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar as anotações." });
    }
  };

  // ATUALIZAR TAREFA
  update = async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, cor, favorita } = req.body;

    try {
      if (isNaN(Number(id))) {
        return res
          .status(400)
          .json({ erro: "O ID deve ser um número válido." });
      }

      const data = {};
      if (titulo !== undefined) data.titulo = titulo;
      if (conteudo !== undefined) data.conteudo = conteudo;
      if (cor !== undefined) data.cor = cor;
      if (favorita !== undefined) data.favorita = favorita;

      const notaAtualizada = await notaModel.update(Number(id), data);

      if (!notaAtualizada) {
        return res.status(404).json({ erro: "Nota não encontrada." });
      }

      res.json(notaAtualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar a nota." });
    }
  };

  // REMOVER TAREFA
  delete = async (req, res) => {
    const { id } = req.params;

    try {
      const sucesso = await notaModel.delete(Number(id));

      if (!sucesso) {
        return res.status(404).json({ erro: "A nota vacilou com você" });
      }

      res.status(200).send({ message: "A nota foi pro vasco!!!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "CHORA FI, CHORA MSM PQ A nota N FOI EXCLUIDA" });
    }
  };

  // MARCAR COMO FAVORITA
  markAsFavorite = async (req, res) => {
    const { id } = req.params;
  
    try {
      if (isNaN(Number(id))) {
        return res.status(400).json({ erro: "O ID deve ser um número válido." });
      }
  
      const notaAtualizada = await notaModel.update(Number(id), { favorita: true });
  
      if (!notaAtualizada) {
        return res.status(404).json({ erro: "Nota não encontrada." });
      }
  
      res.json(notaAtualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao marcar a nota como favorita." });
    }
  };
}

export default new NotaController();
