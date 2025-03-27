import prisma  from "../../prisma/client.js";
import notaController from "../controllers/notaController.js";

class NotaModel {
  getAll = async () => {
    return await prisma.task.findMany();
  };

  create = async (descricao) => {
    return await prisma.task.create({ 
      data: { descricao } 
    });
  };

  update = async (id, concluida, descricao) => {
    try {
      const nota = await prisma.task.update({
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
      const notaDeletada = await prisma.task.delete({
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
