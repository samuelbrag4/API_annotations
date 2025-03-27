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
  
      // Converte o termo para minúsculas
      const lowerCaseTerm = term.toLowerCase();
  
      // Busca no campo 'titulo'
      const notasTitulo = await prisma.nota.findMany({
        where: {
          titulo: { contains: lowerCaseTerm },
        },
      });
  
      // Busca no campo 'conteudo'
      const notasConteudo = await prisma.nota.findMany({
        where: {
          conteudo: { contains: lowerCaseTerm },
        },
      });
  
      // Combina os resultados das duas buscas, removendo duplicatas
      const notas = [...notasTitulo, ...notasConteudo].filter(
        (nota, index, self) =>
          index === self.findIndex((n) => n.id === nota.id)
      );
  
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
