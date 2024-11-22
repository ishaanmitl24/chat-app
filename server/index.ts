import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import cors from "cors";
import { ConnectDB } from "./utils/connectMongoDB";
import responses from "./middlewares/response";
import { authHandler } from "./middlewares/authMiddleware";
import authRoute from "./routes/auth";
import friendRoute from "./routes/friends";
import messageRoute from "./routes/messages";

const app = express();

export interface customError {
  msg: string;
  data?: unknown[];
}

app.use(cors());

app.use(responses);

app.use("/auth", authRoute);
app.use("/friend", authHandler, friendRoute);
app.use("/messages", authHandler, messageRoute);

app.use((err: customError, req: Request, res: Response, next: NextFunction) => {
  const data: unknown[] = (err as customError)?.data || [];
  const msg: string = (err as customError)?.msg || "SERVER DOWN";
  res.status(500).json({ msg: msg, err, ok: false });
});

ConnectDB(() => {
  app.listen(4001, () => {
    console.log("Server Listening on 4001");
  });
});
