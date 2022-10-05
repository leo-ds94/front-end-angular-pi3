const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + ''));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

app.listen(PORT, () => console.log('Servidor em funcionamento na porta ' + PORT));
