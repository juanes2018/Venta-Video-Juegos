const db = require('../config/db');

exports.getAllLocations = async (req, res) => {
  const [rows] = await db.query('select * from locations');
  return rows;
};

exports.getLocationById = async (id) => {
  const [rows] = await db.query('select * from locations where id = ?', [id]);
  return rows[0];
};

exports.createLocation = async (data) => {
  const { name, description } = data;

  const [result] = await db.query(
    'INSERT INTO locations (name, description) VALUES (?, ?)',
    [name, description]
  );

  return { id: result.insertId, name, description };
};

exports.updateLocation = async (id, data) => {
  const { name, description } = data;

  const [result] = await db.query(
    'update locations set name = ?, description = ?where id = ?',
    [name, description, id]
  );
  return result.affectedRows > 0;
};

exports.deleteLocation = async (id) => {
  const [result] = await db.query('delete from locations where id = ?', [id]);

  return result.affectedRows > 0;
};
