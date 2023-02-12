const dotenv = require('dotenv').config();
dotenv;

const process = require('process');
console.log('🔥 here >', process.env.NODE_ENV);

const express = require('express');
const authRoutes = require('./routes/auth');
const weightRoutes = require('./routes/weight');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const databaseConnect = require('./database/index');
const app = express();

databaseConnect;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello world');
});
app.use('/auth', authRoutes);
app.use('/weight', weightRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
