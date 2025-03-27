import express from "express";
import notaRoutes from "./routes/notaRoutes.js";

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/notas", notaRoutes);

app.listen(port, () => {
  console.log(`🟢 API inicializada - PORT: ${port} 🟢`);
});
