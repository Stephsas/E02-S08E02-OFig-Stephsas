// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;


const app = express();

app.set('view engine', 'ejs');
// Je vais dire à express où se situe mon dossier contenant mes vues
// La valeur par défaut est `views`, ici je lui dit de regarder dans le dossier `app/views`
app.set('views', 'app/views');


// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
