require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRoutes = require('./routes/formRoute');
const connectDB = require('./config/db');


const app = express();

console.log('Attempting to connect to the database...'); // Log this to ensure connectDB will be called
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/submit', formRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});
