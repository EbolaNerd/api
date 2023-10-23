import express, { Application, Request, Response } from "express";
import "dotenv/config";
import { add } from "./utils/calculator";

const app: Application = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post("/calculate/add", async (req: Request, res: Response) => {
   const { a, b } = req.body;

   if (!a || typeof a !== "number") return res.status(401).send("'a' must me a number");
   if (!b || typeof b !== "number") return res.status(401).send("'b' must me a number");

   res.status(201).send({ result: add(a, b) });
});

const server = app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
});

module.exports = server;
