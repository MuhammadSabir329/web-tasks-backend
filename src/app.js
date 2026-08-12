import express from 'express';
import cors from 'cors';
import listRoutes from './routes/listRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

listRoutes(app);
taskRoutes(app);

app.get('/', (req, res) => {
  res.send('Tasks API is running');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;