const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const auctionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  bidsCount: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

auctionSchema.statics = {
  incBidsCount(auctionId) {
    return this.findByIdAndUpdate(
      auctionId,
      { $inc: { BidsCount: 1 } },
      { new: true }
    );
  }
};

module.exports = mongoose.model('Auction', auctionSchema);