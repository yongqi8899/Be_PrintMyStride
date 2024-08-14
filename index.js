import "./db/index.js";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";
import ordersRouter from "./routes/ordersRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import dbInit from "./db/index.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: process.env.SPA_ORIGIN, credentials: true }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

dbInit()

app.listen(port, () => console.log(`Server listening on port : ${port}`));
