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
  status: {
    type: String,
    enum: ['opened', 'finished', 'draft'],
    required: true,
    default: 'draft'
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

var autoPopulateCreator = function(next) {
  this.populate('creator');
  next();
};

auctionSchema.pre('findOne', autoPopulateCreator).pre('find', autoPopulateCreator);

module.exports = mongoose.model('Auction', auctionSchema);