const pool = require('./pool.js');
const junctions = {};

junctions.getTagsOfCards = async (cardsArr) => {
  // in the instance for cards that have no tags,

  // would join table still retrieve it?
  try {
    // const sql = `SELECT tags._id, tags.tag_name FROM tags
    //   JOIN junctions ON tags._id = junctions.tag_id
    //   JOIN cards ON junctions.card_id = cards._id
    //   WHERE cards.user_id = 4`;
    // const data = await pool.query(sql);
    // console.log('L15 in getTagsOfCards', data.rows);
    // return data.rows;
    for (let i = 0; i < cardsArr.length; i++) {
      const cardId = cardsArr[i]._id;
      const sql = `SELECT * FROM junctions
        WHERE card_id=$1;`;
      const data = await pool.query(sql, [cardId]);
      let tagsArr = data.rows;
      if (tagsArr.length > 0) {
        // console.log('L23', tagsArr);
        tagsArr = tagsArr.map((juncObj) => { return juncObj.tag_id; });
        // console.log('L25', tagsArr);
      }
      cardsArr[i].tagsIDs = tagsArr;
    }
    //   /*
    //   data.rows = [
    //     {}, {},
    //   ];
    //   */
    // console.log('L23', cardsArr);
    return cardsArr;
    // const fill = cardsArr.map(async (cardObj) => {
    //   const cardId = cardObj._id;
    // //   // console.log('in getTagsOfCards', typeof cardId);
    //   const sql = `SELECT * FROM junctions
    //     WHERE card_id=$1;`;
    //   const data = await pool.query(sql, [cardId]);
    //   cardObj.tags = data.rows;

    //   return cardObj;
    // });


  } catch(err) {
    throw `In junctions.getTagsOfCards: ${err.message}`;
  }
};

// junctions.addTagToCard = async (args) => {
//   try {
//     const arr = [ Number(args['card_id']), Number(args['tag_id']) ];
//     const sql = `INSERT INTO junctions
//       (card_id, tag_id) VALUES ($1, $2)
//       RETURNING *;`;
//     const data = await pool.query(sql, arr);
//   } catch() {}
// };
// junctions.deleteTagFromCard = async () => {
//   try {} catch() {}
// };

module.exports = junctions;
