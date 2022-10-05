const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

const appName = 'site-dpto';

const outputPath = `${__dirname}/dist/${appName}`;

app.use(express.json());

// seta o diretorio de build para servir o conteudo Angular
app.use(express.static(outputPath));
// redirecionar qualquer requisicao para o index.html
app.get('/*', (req, res) => {
  res.sendFile(`${outputPath}/index.html`);
});
// ouvir a porta que o Heroku disponibilizar
app.listen(PORT, () => console.log('Servidor em funcionamento na porta ' + PORT));
