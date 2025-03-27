import prisma from "../../prisma/client.js";
import notaController from "../controllers/notaController.js";

class NotaModel {
  getAll = async () => {
    return await prisma.nota.findMany();
  };

  getById = async (id) => {
    return await prisma.nota.findUnique({
      where: { id },
    });
  };

  create = async (titulo, conteudo, cor, favorita) => {
    return await prisma.nota.create({
      data: {
        titulo,
        conteudo,
        cor,
        favorita,
      },
    });
  };

  searchByTerm = async (term) => {
    try {
      console.log("Termo recebido no model:", term);
      const notas = await prisma.nota.findMany({
        where: {
          OR: [
            { titulo: { contains: term, mode: "insensitive" } },
            { conteudo: { contains: term, mode: "insensitive" } },
          ],
        },
      });
      console.log("Notas encontradas:", notas);
      return notas;
    } catch (error) {
      console.error("Erro ao buscar notas por termo:", error);
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const notaAtualizada = await prisma.nota.update({
        where: { id },
        data,
      });
  
      return notaAtualizada;
    } catch (error) {
      console.log("Erro ao atualizar nota", error);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const notaDeletada = await prisma.nota.delete({
        where: { id },
      });

      return notaDeletada;
    } catch (error) {
      console.log("Num quero deletar vacilão!", error);
      throw error;
    }
  };
}
export default new NotaModel();
