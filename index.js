import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

import swaggerSpec from './src/config/swagger.js';
import config from './src/config/index.js';
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import { globalLimiter } from './src/middlewares/rateLimiter.middleware.js';
import v1Routes from './src/routes/index.js';

dotenv.config();

const app = express();



app.use(helmet());


const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// 3. Global Rate Limiting
app.use(globalLimiter);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Blog API Documentation'
}));


// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Blog API is running',
        student: 'Jana Cornejo',
        section: 'IT4C',
        program: 'Information Technology',
        version: 'v1',
        documentation: '/api-docs'
    });
});

// Legacy test routes
app.get('/hello/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

app.get('/foo', (req, res) => {
    console.log(req.query);
    res.send('Check console for query params');
});

app.get('/IT', (req, res) => {
    console.log(req.body);
    res.send('Check console for body data');
});

// API v1 routes
app.use('/api/v1', v1Routes);

app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});


app.listen(config.port, () => {
    console.log(`Server running in ${config.nodeEnv} mode at http://localhost:${config.port}`);
    console.log(`API Documentation available at http://localhost:${config.port}/api-docs`);
    console.log(`Security features: Helmet ✓ | CORS ✓ | Rate Limiting ✓`);
    testConnection();
});