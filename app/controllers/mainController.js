const path = require('path');
const dataMapper = require('../dataMapper');

const mainController = {
  // méthode pour la page d'accueil
  async homePage(req, res) {
    try {
      const figurines = await dataMapper.getAllFigurines();
      res.render('accueil', { figurines });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération des figurines');
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
      res.status(500).send('Erreur lors de la récupération de la figurine');
    }
  }
};

module.exports = mainController;
