const pool = require('./pool.js');
const tags = {};

tags.getUserTags = async (id) => {
  try {
    const sql = `SELECT * FROM tags;`;
    const data = await pool.query(sql);
    // console.log('tags:', data.rows);
    // if (data.rows === undein)
    // const map =
    return (data.rows);
  } catch (err) {
    throw `In tags.getUserTags: ${err.message}`;
  }
};
tags.addNewTag = async (args) => {
  try {
    const arr = [
      Number(args['user_id']),
      args['tag_name'],
    ];

    const sql = `INSERT INTO tags
      (user_id, tag_name)
      VALUES ($1, $2)
      RETURNING *;`;
    // execute sql command
    const data = await pool.query(sql, arr);
    return data.rows[0];
  } catch (err) {
    throw `In tags.addNewTag: ${err.message}`;
  }
};
// tags.deleteTag = async () => {
//   try {} catch() {}
// };

module.exports = tags;