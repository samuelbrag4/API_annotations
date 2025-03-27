import prisma  from "../../prisma/client.js";
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

  update = async (id, concluida, descricao) => {
    try {
      const nota = await prisma.nota.update({
        where: { id },
        data: {
          concluida: concluida !== undefined ? concluida : true,
          descricao, 
        },
      });

      return nota; 
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const notaDeletada = await prisma.nota.delete({
        where: { id },
      });

      return notaDeletada
    } catch (error) {
      console.log("Num quero deletar vacilão!", error);
      throw error;
    }
  };
}
export default new NotaModel();
