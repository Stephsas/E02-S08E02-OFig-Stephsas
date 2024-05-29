const path = require('path');
const dataMapper = require('../dataMapper');

const mainController = {
  // méthode pour la page d'accueil
  async homePage(req, res) {
    try {
      const figurines = await dataMapper.getAllFigurines();
      // je passe les figurines à ma vue
      res.render('accueil', { figurines });
    } catch (error) {
      console.error(error);
      res.status(500).send('ERREUR PAS DE FIGURINES');
    }
  },

  // méthode pour la page article
  async articlePage(req, res) {
    try {
      const figurineId = req.params.id; 

      const figurine = await dataMapper.getOneFigurine(figurineId);
      if (!figurine) {
        // Si la figurine n'est pas trouvée, renvoyer une erreur 404
        return res.status(404).send('Figurine non trouvée SORRY');
      }
      res.render('article', { figurine });
    } catch (error) {
      console.error(error);
      res.status(500).send('ERREUR FIGURINE INCONNUE');
    }
  }
};

module.exports = mainController;
