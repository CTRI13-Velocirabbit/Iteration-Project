// const db = require('../db/db.js');
const cards = require('../db/cards.js');
const tags = require('../db/tags.js');
const junctions = require('../db/junctions.js');
// const users = require('../db/users.js');

const express = require('express');
const router = express.Router();

router.get('/cards/nextCard/:id', async (req, res, next) => {
  try {

    // console.log('just checking');

    const _id = req.params.id;
    const row = await cards.readAllCards();
    const ids = row.map(element => {
      return element._id;
    })

    // console.log('ids', ids);

    let idx = ids.findIndex((element) => {
      return element === Number(_id);
    });

    // console.log('idx', idx);

    const newIdx = (idx + 1) % ids.length;

    // console.log('newIdx', newIdx)

    res.status(200).json(row[newIdx]._id);
  } catch (err) {
    next({
      log: 'error getting cards',
      status: 500,
      message: { err: err },
    });
  }
})

router.get('/cards/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const row = await cards.readCard(_id);
    // no card found
    if (row === undefined) throw `no card with id=${_id} found`;
    res.status(200).json(row);
  } catch (err) {
    next({
      log: 'error getting single card',
      status: 500,
      message: { err: err },
    });
  }
});

router.get('/cards', async (req, res, next) => {
  try {
    // const { id } = req.params;
    let allCards = await cards.readAllCards();
    const allTags = await tags.getUserTags();
    if (allTags) {
      allCards = await junctions.getTagsOfCards(allCards);
    }
    res.status(200).json({ allCards: allCards, allTags: allTags });
    // res.status(200).json(allCards);

  } catch (err) {
    next({
      log: 'error getting cards',
      status: 500,
      message: { err: err },
    });
  }
});

router.post('/cards', async (req, res, next) => {
  try {
    // sanitize post data
    const { user_id, title, card_front, card_back, correct_count, incorrect_count } = req.body;
    const data = {
      user_id,
      title,
      card_front,
      card_back,
      correct_count,
      incorrect_count
    };

    // console.log('creating data: ', data);
    const row = await cards.createCard(data);
    // ????
    res.status(200).json(row);
  } catch (err) {
    next({
      log: 'error creating card',
      status: 500,
      message: { err: err },
    });
  }
});
router.post('/tags', async (req, res, next) => {
  try {
    const { user_id, tag_name } = req.body;
    const data = { user_id, tag_name };
    const newTag = await tags.addNewTag(data);
    res.status(200).json(newTag);
  } catch(err) {
    next({
      log: 'error creating tag',
      status: 500,
      message: { err: err },
    });
  }
});

router.put('/cards/:id', async (req, res, next) => {
  try {

    const { _id, user_id, title, card_front, card_back, correct_count, incorrect_count } = req.body;
    const data = { _id, user_id, title, card_front, card_back, correct_count, incorrect_count };

    const row = await cards.updateCard(data);
    res.status(200).json(row);
    console.log('updated sucessfully');
    return next();

  } catch(err) {
    next({
      log: 'error updating the card',
      status: 500,
      message: { err: err },
    });
  }
})

router.delete('/cards/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const row = await cards.deleteCard(_id);
    if(row === undefined) throw `no card with id=${_id} was not found`;
    res.status(200).json(row);
    console.log('deleted sucessfully');
    return next();

  } catch(err) {
    next({
      log: 'error deleting the card',
      status: 500,
      message: { err: err },
    });
  }
})

module.exports = router;
