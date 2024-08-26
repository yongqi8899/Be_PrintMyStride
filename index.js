import "./db/index.js";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";
import ordersRouter from "./routes/ordersRouter.js";
import usersRouter from "./routes/usersRouter.js";
import reviewsRouter from "./routes/reviewsRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import dbInit from "./db/index.js";

import { join } from "path";

const app = express();
const port = process.env.PORT || 8080;

var whitelist = process.env.SPA_ORIGIN
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }, 
  credentials: true 
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(join(import.meta.dirname, "uploads")))
app.use("/auth", authRouter);

app.use("/products", productsRouter);
// app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

dbInit()

app.listen(port, () => console.log(`Server listening on port : ${port}`));
