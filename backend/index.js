const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morganMiddleware = require('./middlewares/logger');
const multer = require('multer');
const userRoutes = require('./routes/userRoutes'); 

require('dotenv').config({ path: path.join(__dirname, '.env') });

const port = 3007;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(morganMiddleware);
app.get('/health', (req, res) => res.send({ message: 'ok' }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.use('/users', userRoutes); 

const server = app.listen(port, () => {
  console.log(`Datatys App running on port ${port}.`);
});

module.exports = server;
