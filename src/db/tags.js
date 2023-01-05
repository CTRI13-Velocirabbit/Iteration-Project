const pool = require('./pool.js');
const tags = {};

tags.getUserTags = async () => {
  try {
    const sql = `SELECT * FROM tags WHERE tags.user_id=$`;
  } catch() {}
};
// tags.addNewTag = async () => {
//   try {} catch() {}
// };
// tags.deleteTag = async () => {
//   try {} catch() {}
// };

module.exports = tags;