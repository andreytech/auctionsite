// const router = require('express').Router();
let Auction = require('../models/auction.model');

const auctionsList = (req, res) => {
  Auction.find()
    .then(auctions => res.json(auctions))
    .catch(err => res.status(400).json('Error: ' + err));
};

const createAuction = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  const newAuction = new Auction({
    title: title,
    description: description,
    creator: '5e149a6390108347c491d866',
    status: 'opened',
  });

  newAuction.save()
    .then(() => res.json('Auction added!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exercise deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => {
//       exercise.username = req.body.username;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise.save()
//         .then(() => res.json('Exercise updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = {auctionsList, createAuction};