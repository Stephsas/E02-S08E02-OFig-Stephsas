const path = require('path');
const DataMapper = require('../dataMapper');

const bookmarksController = {

   // méthode pour afficher les favoris
   bookmarksPage: (request, response) => {
    response.render('favoris', {
      // Je passe les favoris en sessions à ma vue
      figurines: request.session.bookmarks
    });
  },
  async addToBookmarks(req, res) {
    // Je vais vérifier que ma figurine existe bien en bdd
    const id = req.params.id;
    try {
      const figurine = await DataMapper.getOneFigurine(id);
      if(figurine) {
        // Si ma figurine existe
        // Je vais vérifier qu'elle n'est pas déjà dans mes favoris
        const figurineFounded = req.session.bookmarks.find(
          (figurineInBookmark) => figurineInBookmark.id === figurine.id
        )

        // Si elle n'est pas dans mes favoris, je l'ajoute
        if(!figurineFounded) {
          req.session.bookmarks.push(figurine);
        }
      }
      res.redirect('/bookmarks');
    } catch(error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération de la figurine');
    }
  },
  removeFromBookmarks(req, res) {
    const id = Number(req.params.id);

   
    // Je vais modifier mon tableau de favoris en filtrant dessus pour retirer la figurine dont l'id est celui passé en paramètre
    req.session.bookmarks = req.session.bookmarks.filter(
      (figurine) => figurine.id !== id
    )
    res.redirect('/bookmarks');
  }
};


module.exports = bookmarksController;
