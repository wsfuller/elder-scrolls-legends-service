const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  cards: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
