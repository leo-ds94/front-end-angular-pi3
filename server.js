// importar express
const express = require('express');

// iniciar express
const app = express();

// nome da pasta no dist que sera feito o build
const appName = 'site-dpto';

const outputPath = `${__dirname}/dist/${appName}`;

// seta o diretorio de build para servir o conteudo Angular
app.use(express.static(outputPath));

// redirecionar qualquer requisicao para o index.html
app.get('/*', (req, res) => {
  res.sendFile(`${outputPath}/index.html`);
});
// ouvir a porta que o Heroku disponibilizar
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Servidor em funcionamento na porta ' + PORT));
