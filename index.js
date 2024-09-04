import "./db/index.js";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";
import ordersRouter from "./routes/ordersRouter.js";
import usersRouter from "./routes/usersRouter.js";
import reviewsRouter from "./routes/reviewsRouter.js";
import paymentsRouter from "./routes/paymentsRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import dbInit from "./db/index.js";

import { join } from "path";

const app = express();
const port = process.env.PORT || 8080;

const whitelist = [process.env.SPA_ORIGIN1 , process.env.SPA_ORIGIN2]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }, 
  credentials: true 
}

// const corsOptions = {
//   origin: '*', // Allow all origins (not recommended for production)
//   credentials: true
// };
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.static(join(import.meta.dirname, "uploads")))
app.use("/auth", authRouter);

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);
app.use("/reviews", reviewsRouter);
app.use("/payments", paymentsRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

dbInit()

app.listen(port, () => console.log(`Server listening on port : ${port}`));
