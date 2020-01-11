const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const Auction = require('./auction');

const bidSchema = new Schema({
    value: { type: Number, required: true },
    description: { type: String, required: true },
    auction: {
        type: Schema.Types.ObjectId,
        ref: 'Auction'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false,
});

bidSchema.pre('save', async function (next) {
    if (this.isNew) {
        await Auction.incBidCount(this.auction);
    }
    next();
});

bidSchema.plugin(autopopulate);

module.exports = mongoose.model('Bid', bidSchema);