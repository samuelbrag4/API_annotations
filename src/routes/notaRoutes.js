import express from "express";
import notaController from "../controllers/notaController.js";

const router = express.Router();

// PEGAR TODAS
router.get("/", notaController.getAll);

// PEGAR PELO ID
router.get("/:id", notaController.getById);

// CRIAR
router.post("/", notaController.create);

// PROCURAR POR TERMO
router.get("/search/:term", notaController.searchByTerm);

// ATUALIZAR
router.put("/:id", notaController.update);

// REMOVER
router.delete("/:id", notaController.delete);

// MARCAR COMO FAVORITA
router.patch("/:id/favorite", notaController.markAsFavorite); 

export default router;
