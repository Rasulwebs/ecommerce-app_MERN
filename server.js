import express from "express";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// env configure ============================================
dotenv.config();
const PORT = process.env.PORT || 3080;

//  database connect ============================================
connectDB();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// middlewares ===============================================
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/client/build")));

// routes====================================================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// res api ================================================================
// app.get("/", (req, res) => {
//   res.send({
//     message: "Welcome Mern Stack project",
//   });
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

//  running server
app.listen(PORT, () => {
  console.log(`Server Running ... ${PORT}`);
});
