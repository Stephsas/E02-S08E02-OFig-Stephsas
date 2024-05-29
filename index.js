// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');
const session = require('express-session');

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;


const app = express();

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

// on set le moteur de rendu
app.set('view engine', 'ejs');
// Attention ! Pour set le dossier de vues, on doit utiliser un chemin relatif !
app.set('views', 'app/views');

// J'initialise le middleware de session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

// Je vais me faire un middleware pour initialiser les variables de ma session !
// Ça évitera de devoir le faire dans chaque route
app.use((req, res, next) => {
  // Je m'assure que les données de ma session sont bien initialisées
  // Si je n'ai pas la variable books dans ma session, je l'initialise à un tableau vide
  if(!req.session.bookmarks) {
    req.session.bookmarks = [];
  }
  next();
})

// routage !
app.use(router);

app.use((req, res) => {
  res
    .status(404)
    .send('Hoooo... 404');
})

// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
