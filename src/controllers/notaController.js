import notaModel from "../models/notaModel.js";
class NotaController {
  getAll = async (req, res) => {
    try {
      const notas = await notaModel.getAll();
      res.json(notas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar as notas" });
    }
  };

  create = async (req, res) => {
    const { titulo, conteudo, cor, favorita } = req.body;
    try {
      if (!titulo || !conteudo || !cor || favorita === undefined) {
        return res.status(400).json({
          erro: "Os campos 'titulo', 'conteudo', 'cor' e 'favorita' são obrigatórios.",
        });
      }

      if (typeof titulo !== "string") {
        return res
          .status(400)
          .json({ erro: "O campo 'titulo' deve ser uma string." });
      }

      if (typeof conteudo !== "string") {
        return res
          .status(400)
          .json({ erro: "O campo 'conteudo' deve ser uma string." });
      }

      if (typeof cor !== "string") {
        return res
          .status(400)
          .json({ erro: "O campo 'cor' deve ser uma string." });
      }

      if (typeof favorita !== "boolean") {
        return res
          .status(400)
          .json({ erro: "O campo 'favorita' deve ser um booleano." });
      }

      const novaNota = await notaModel.create(titulo, conteudo, cor, favorita);
      res.status(201).json(novaNota);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao Criar a Nota" });
    }
  };

  searchByTerm = async (req, res) => {
    const { term } = req.params;

    if (!term || term.trim() === "") {
      return res
        .status(400)
        .json({ erro: "O termo de busca não pode estar vazio." });
    }

    try {
      const notas = await prisma.nota.findMany({
        where: {
          OR: [
            { titulo: { contains: term, mode: "insensitive" } },
            { conteudo: { contains: term, mode: "insensitive" } },
          ],
        },
      });

      res.json(notas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar as anotações." });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, cor, favorita } = req.body;

    try {
      const notaAtualizada = await notaModel.update(
        Number(id),
        titulo,
        conteudo,
        cor,
        favorita
      );

      if (!titulo && !conteudo && !cor && favorita === undefined) {
        return res.status(400).json({
          erro: "Pelo menos um dos campos 'titulo', 'conteudo', 'cor' ou 'favorita' deve ser enviado para atualização.",
        });
      }

      if (titulo && typeof titulo !== "string") {
        return res
          .status(400)
          .json({ erro: "O campo 'titulo' deve ser uma string." });
      }

      if (conteudo && typeof conteudo !== "string") {
        return res
          .status(400)
          .json({ erro: "O campo 'conteudo' deve ser uma string." });
      }

      if (cor && typeof cor !== "string") {
        return res
          .status(400)
          .json({ erro: "O campo 'cor' deve ser uma string." });
      }

      if (favorita !== undefined && typeof favorita !== "boolean") {
        return res
          .status(400)
          .json({ erro: "O campo 'favorita' deve ser um booleano." });
      }

      res.json(notaAtualizada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Filhote, não deu pra atualizar." });
    }
  };

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
}

export default new NotaController();
