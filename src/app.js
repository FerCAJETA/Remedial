import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv/config';
import connectDB from './connection/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import careersRoutes from './routes/careers.routes.js';
import groupsRoutes from './routes/groups.routes.js';
import studentsRoutes from './routes/students.routes.js';
import subjectsRoutes from './routes/subjects.routes.js';
import teachersRoutes from './routes/teachers.routes.js';
import cors from 'cors';

connectDB(); 
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', careersRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/teachers', teachersRoutes);

export default app;