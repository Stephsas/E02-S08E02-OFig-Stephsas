const client = require('./database');

const dataMapper = {

    // Méthode pour obtenir toutes les figurines
    async getAllFigurines() {
      const result = await client.query('SELECT * FROM figurine');
      // Je retourne directement le tableau de figurines situer dans la propriété rows de l'objet result
      return result.rows;
    },
    // Méthode pour obtenir 1 figurine
    async getOneFigurine(id) {
      const result = await client.query({
        text: 'SELECT * FROM figurine WHERE id = $1',
        values: [id]
      });
  
      // Le but de notre méthode est de retourner une seule figurine, donc on retourne directement le premier élément du tableau de figurines
      return result.rows[0];
    }
};


module.exports = dataMapper;