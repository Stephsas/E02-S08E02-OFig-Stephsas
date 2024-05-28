const client = require('./database');

const dataMapper = {

    // Méthode pour obtenir toutes les figurines
  async getAllFigurines() {
    const query = 'SELECT * FROM figurine;';
    try {
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error('toutes les figurines sont introuvables SORRY', error);
      throw error;
    }
  },

  // Méthode pour obtenir une seule figurine par son id
  async getOneFigurine(id) {
    const query = 'SELECT * FROM figurine WHERE id = $1;';
    try {
      const result = await client.query(query, [id]);
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error(` figurine introuvable SORRY ${id}:`, error);
      throw error;
    }
  }
};


module.exports = dataMapper;