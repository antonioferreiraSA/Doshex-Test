const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const weightRoutes = require('./routes/weight');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const app = express();

mongoose.connect(
  'mongodb+srv://toni:1234@cluster0.elminod.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.error(error);
    }
  },
);

app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello world');
});
app.use('/auth', authRoutes);
app.use('/weight', weightRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
