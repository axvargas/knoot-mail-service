const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(require('./routes/index.js'));

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});