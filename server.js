import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Разрешаем CORS (по умолчанию — все источники)
app.use(cors());

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});