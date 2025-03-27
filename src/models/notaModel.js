import prisma from "../../prisma/client.js";
import notaController from "../controllers/notaController.js";

class NotaModel {
  
  // PEGAR TODAS
  getAll = async () => {
    const notas = await prisma.nota.findMany();
    return notas.map(nota => ({
      ...nota,
      tags: nota.tags ? nota.tags.split(",") : [], 
    }));
  };

  // PEGAR PELO ID
  getById = async (id) => {
    const nota = await prisma.nota.findUnique({
      where: { id },
    });
    return nota ? { ...nota, tags: nota.tags ? nota.tags.split(",") : [] } : null;
  };

  // CRIAR NOVA
  create = async (titulo, conteudo, cor, favorita, tags) => {
    try {
      console.log("Dados recebidos no model:", { titulo, conteudo, cor, favorita, tags });
      const nota = await prisma.nota.create({
        data: {
          titulo,
          conteudo,
          cor,
          favorita,
          tags: tags ? tags.join(",") : null,
        },
      });
      return nota;
    } catch (error) {
      console.error("Erro ao criar a nota no model:", error);
      throw error;
    }
  };

  // PROCURAR POR TERMO
  searchByTerm = async (term) => {
    try {
      console.log("Termo recebido no model:", term);
  
      const lowerCaseTerm = term.toLowerCase();
  
      const notasTitulo = await prisma.nota.findMany({
        where: {
          titulo: { contains: lowerCaseTerm },
        },
      });
  
      const notasConteudo = await prisma.nota.findMany({
        where: {
          conteudo: { contains: lowerCaseTerm },
        },
      });
  
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

  // ATUALIZAR
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

  // REMOVER
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