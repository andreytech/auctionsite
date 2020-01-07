const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const isAuth = require('./middlewares/is-auth');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(isAuth);

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

module.exports = app;