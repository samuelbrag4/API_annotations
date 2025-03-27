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
    const { descricao } = req.body;
    try {
      if (!descricao) {
        return res.status(400).json({ erro: "Descrição é obrigatória" });
      }
      const novaNota = await notaModel.create(descricao);
      res.status(201).json(novaNota);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao criar a nota" });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const { concluida, descricao } = req.body;

    try {
      const notaAtualizada = await notaModel.update(Number(id), concluida, descricao);

      if(!notaAtualizada) {
        return res.status(404).json({ erro: "Não achei a nota não man..." });
      } 

      res.json(notaAtualizada)

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

      res.status(200).send({ message: "A nota foi pro vasco!!!"});

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "CHORA FI, CHORA MSM PQ A nota N FOI EXCLUIDA" });
    }
  };
}

export default new NotaController();
