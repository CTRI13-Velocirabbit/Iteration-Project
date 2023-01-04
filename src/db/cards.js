const pool = require('./pool.js');

const cards = {};

cards.readCard = async (id) => {
  try {
    const sql = `SELECT *
    FROM cards
    WHERE _id=$1;`;
    const data = await pool.query(sql, [id]);
    // TODO: validate that there is only one row
    return data.rows[0];
  } catch (err) {
    throw `In db.js:cards.readCard: ${err.message}`;
  }
};

cards.readAllCards = async () => {
  try {
    const sql = `SELECT *
    FROM cards;`;
    const data = await pool.query(sql);
    return data.rows;
  } catch (err) {
    throw `In db.js:cards.readAllCards: ${err.message}`;
  }
};

cards.createCard = async (args) => {
  try {
    // this is the current time in format 2022-12-28 12:34:56
    const currentTime = new Date();
    const formattedTime = currentTime
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    // parameterize sql arguments to prevent attacks
    const arr = [
      Number(args['user_id']),
      args['title'],
      args['card_front'],
      args['card_back'],
      args['correct_count'],
      args['incorrect_count'],
      // Number(args['difficulty']),
      // args['hints'],
      // args['scheduled'] === undefined ? formattedTime : args['scheduled'], // args['scheduled'] should have format 2022-12-28 12:34:56
    ];

    const sql = `INSERT INTO cards
      (user_id, title, card_front, card_back, correct_count, incorrect_count)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`;
    // execute sql command
    const data = await pool.query(sql, arr);
    return data.rows[0];
  } catch (err) {
    throw `In db.js:cards.createCard: ${err.message}`;
  }
};

cards.updateCard = async (args) => {
  try {
    // console.log('checking for update');
    // console.log(args);
    const selectUserSQL = ` SELECT * FROM cards WHERE _id=$1`;
    const data1 = await pool.query(selectUserSQL, [Number(args['_id'])]);
    console.log('data1', data1.rows[0]);

    const arr = [
      Number(args['_id']),
      args['user_id'] === undefined ? data1.rows[0].user_id : args['user_id'],
      args['title'] === undefined ? data1.rows[0].title : args['title'],
      args['front'] === undefined ? data1.rows[0].front : args['front'],
      args['back'] === undefined ? data1.rows[0].back : args['back'],
      Number(args['difficulty']) === undefined ? data1.rows[0].difficulty : args['difficulty'],
      args['hints'] === undefined ? data1.rows[0].hints : args['hints'],
      args['scheduled'] === undefined ? data1.rows[0].scheduled : args['scheduled'],
    ];

    const updateUserSQL = ` UPDATE cards
    SET title = $3,
    user_id = $2,
    front = $4,
    back = $5,
    difficulty = $6,
    hints = $7,
    scheduled = $8
    WHERE _id = $1`;

    const data2 = await pool.query(updateUserSQL, arr);

  } catch (err) {
    throw `In db.js: cards.updateCard: ${err.message}`;
  }
}

cards.deleteCard = async (id) => {
  try {

    sql = `DELETE FROM cards WHERE _id=$1 RETURNING *`;
    const data = await pool.query(sql, [id]);
    return data.rows[0];

  } catch (err) {
    throw `In db.js: cards.deleteCard: ${err.message}`;
  }

}


module.exports = cards;
