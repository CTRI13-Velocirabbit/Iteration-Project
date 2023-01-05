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
    const sql = `SELECT * FROM cards;`;
    const data = await pool.query(sql);
    // console.log('readAllCards', data.rows);
    return data.rows;
  } catch (err) {
    throw `In db.js:cards.readAllCards: ${err.message}`;
  }
};

cards.createCard = async (args) => {
  try {
    // // this is the current time in format 2022-12-28 12:34:56
    // const currentTime = new Date();
    // const formattedTime = currentTime
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace('T', ' ');

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
      args['card_front'] === undefined ? data1.rows[0].card_front : args['card_front'],
      args['card_back'] === undefined ? data1.rows[0].card_back : args['card_back'],
      Number(args['correct_count']) === undefined ? data1.rows[0].correct_count : Number(args['correct_count']),
      Number(args['incorrect_count']) === undefined ? data1.rows[0].incorrect_count : Number(args['incorrect_count']),
    ];

    const updateUserSQL = ` UPDATE cards
      SET user_id = $2,
      title = $3,
      card_front = $4,
      card_back = $5,
      correct_count = $6,
      incorrect_count = $7,
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
