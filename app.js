const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

require('./config/database');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(`Listening port at ${port}`);
})