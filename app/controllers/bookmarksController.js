const path = require('path');
const DataMapper = require('../dataMapper');

const bookmarksController = {

  // méthode pour afficher les favoris
  bookmarksPage: (request, response) => {
    response.render('favoris');
  },
  async addToBookmarks(req, res) {
    // Je vais vérifier que ma figurine existe bien en bdd
    const id = req.params.id;
    try {
      const figurine = await DataMapper.getOneFigurine(id);
      if(figurine) {
        // Si ma figurine existe, je vais la rajouter dans mes favoris en session
        req.session.bookmarks.push(figurine);
      }
      res.redirect('/bookmarks');
    } catch(error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération de la figurine');
    }
  }
};


module.exports = bookmarksController;
