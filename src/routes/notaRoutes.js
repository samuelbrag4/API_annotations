import express from "express";
import notaController from "../controllers/notaController.js";

const router = express.Router();

router.get("/", notaController.getAll);
router.get("/:id", notaController.getById);
router.post("/", notaController.create);
router.get("/search/:term", notaController.searchByTerm); // Pesquisa
router.put("/:id", notaController.update);
router.delete("/:id", notaController.delete);
router.patch("/:id/favorite", notaController.markAsFavorite); // Pesquisa

export default router;
