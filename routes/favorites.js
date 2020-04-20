const express = require('express');
const mongoose = require('mongoose');
const Favorite = require('../models/Favorite');
const { validateToken } = require('../utils/auth');
const router = express.Router();

const { ObjectId } = mongoose.Types;

// GET CARDS
router.get('/', validateToken, async (req, res) => {
  const {
    user: { id },
  } = req.user; // comes from validateToken
  try {
    const userFavorites = await Favorite.findOne({ user: id });

    // CREATE NEW FAVORTES OBJECT
    if (!userFavorites) {
      return res.status(200).json({
        message: 'Sorry, no favorites found',
        cards: [],
      });
    }
    res.status(200).json({ cards: userFavorites.cards });
  } catch (error) {
    console.log('Error getting user favorites: ', error);
    res.status(500).send('There was an error trying to get your favorites');
  }
});

// ADD & REMOVE CARDS
router.put('/', validateToken, async (req, res) => {
  const {
    user: { id: userId },
  } = req.user; // comes from validateToken
  const { cardId } = req.body;

  try {
    const favorite = new Favorite({
      user: ObjectId(userId),
      cards: cardId,
    });

    const userFavorites = await Favorite.findOne({ user: userId });

    // CREATE NEW FAVORTES OBJECT
    if (!userFavorites) {
      favorite.save((error, cards) => {
        if (error) {
          console.log(`Error saving favorites: ${error}`);
        }
        return res.status(200).json({
          message: 'Card favorite saved successfully',
          cards: cards.cards,
        });
      });
    } else {
      // REMOVE CARD IF ID EXISTS
      if (userFavorites.cards.includes(cardId)) {
        Favorite.findOneAndUpdate(
          { user: userId },
          { $pull: { cards: cardId } },
          { new: true },
          (error, cards) => {
            if (error) {
              console.log('error removing card');
              return res.status(500).json(error);
            }
            return res.status(200).json({
              message: 'Card removed successfully',
              cards: cards.cards,
            });
          }
        );
      } else {
        // ADD CARD ID IF IT DOESN'T EXSIST
        Favorite.findOneAndUpdate(
          { user: userId },
          { $push: { cards: cardId } },
          { new: true },
          (error, cards) => {
            if (error) {
              console.log('error adding card');
              return res.status(500).json(error);
            }
            return res.status(200).json({
              message: 'Card added successfully',
              cards: cards.cards,
            });
          }
        );
      }
    }
  } catch (error) {
    console.log('Error saving favorites: ', error);
    return res.status(500).send('error trying to save to favorites');
  }
});

module.exports = router;
