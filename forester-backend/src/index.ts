import express, { Express, Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerJson from "../build/swagger.json";
import { RegisterRoutes } from '../build/routes';
import { errorHandler } from './services/errorHandler.service';
import cors from 'cors';

/* env */
dotenv.config();

/* Express */
const app: Express = express();
const port = process.env.PORT || 8000;

/* CORS */
app.use(cors<Request>());

/* Json Handling */
app.use(express.json());

/* Logging */
app.use(morgan('tiny'));

/* Swagger */
app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

/* Routes */
RegisterRoutes(app);

/* Error Handling */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error encountered: ', err.message || err);
  
    next(err);
  });
  
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res);
  });

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
